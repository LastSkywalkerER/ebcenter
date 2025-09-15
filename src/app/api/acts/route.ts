import { serverEnv } from '@/shared/config/server-env'
import { getAuthUser } from '@/shared/lib/auth'
import { nocodb } from '@/shared/lib/nocodb'
import type { Act } from '@/shared/types/admin'
import { ActCreateSchema } from '@/shared/types/admin'
import type { ActSummary, DateFilterData, RequestParams } from '@/shared/types/ui'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    const dateFilter = searchParams.get('date') // Формат: YYYY-MM или пусто
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    console.log('Acts filter params:', { clientId, dateFilter, page, limit })

    const requestParams: RequestParams = {
      limit,
      offset,
      sort: '-date',
      viewId: serverEnv.NOCO_ACTS_VIEW_ID,
    }

    // Формируем where-условие только для клиента (дату будем фильтровать на сервере)
    if (clientId && clientId !== 'all') {
      requestParams.where = `(clients_id,eq,${clientId})`
    }

    // Сохраняем фильтр по дате для обработки после получения данных
    let dateFilterData: DateFilterData | null = null
    if (dateFilter) {
      const [year, month] = dateFilter.split('-')
      if (year && month) {
        const startDate = `${year}-${month.padStart(2, '0')}-01`
        // Вычисляем последний день месяца более простым способом
        const yearNum = parseInt(year)
        const monthNum = parseInt(month) // 9 для сентября
        const lastDay = new Date(yearNum, monthNum, 0).getDate() // последний день месяца
        const endDate = `${year}-${month.padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`
        dateFilterData = { startDate, endDate }
        console.log('Will filter dates on server:', { dateFilter, startDate, endDate })
      }
    }

    console.log('Acts where clause:', requestParams.where)

    const response = await nocodb.getRecords<Act>(serverEnv.NOCO_ACTS_TABLE_ID, requestParams)

    // Фильтруем по дате на сервере, если есть dateFilter
    if (dateFilterData) {
      console.log(
        'Raw response data:',
        response.list.map(
          (act): ActSummary => ({
            id: act.Id,
            date: act.date,
            dateType: typeof act.date,
          })
        )
      )
      console.log('Filter range:', dateFilterData)

      const filteredList = response.list.filter((act) => {
        if (!act.date) {
          console.log(`Skipping record ${act.Id} - no date`)
          return false
        }

        const dateStr = String(act.date)
        const isInRange = dateStr >= dateFilterData!.startDate && dateStr <= dateFilterData!.endDate
        console.log(`Record ${act.Id}: date="${dateStr}", inRange=${isInRange}`)

        return isInRange
      })

      console.log(`Filtered ${response.list.length} records to ${filteredList.length} by date`)

      return NextResponse.json({
        ...response,
        list: filteredList,
        pageInfo: {
          ...response.pageInfo,
          totalRows: filteredList.length,
        },
      })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get acts error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const actData = ActCreateSchema.parse(body)

    const lastDayOfMonth = new Date(actData.year, actData.month, 0)
    // Используем локальные методы даты вместо toISOString() чтобы избежать проблем с часовыми поясами
    const year = lastDayOfMonth.getFullYear()
    const month = String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')
    const day = String(lastDayOfMonth.getDate()).padStart(2, '0')
    const date = `${year}-${month}-${day}`

    console.log('Created act date:', date)

    // Проверяем уникальность комбинации номер + клиент
    // Сначала получаем все акты клиента
    const clientActs = await nocodb.getRecords<Act>(serverEnv.NOCO_ACTS_TABLE_ID, {
      where: `(clients_id,eq,${actData.clientId})`,
      limit: 1000, // Получаем много актов чтобы проверить номера
    })

    // Проверяем есть ли акт с таким номером у этого клиента
    const duplicateAct = clientActs.list.find((act) => act.number === actData.number)
    if (duplicateAct) {
      return NextResponse.json(
        { error: `Акт с номером ${actData.number} для этого клиента уже существует` },
        { status: 400 }
      )
    }

    // Проверяем, что дата нового акта не раньше последнего акта клиента
    // Используем уже полученные акты клиента
    if (clientActs.list.length > 0) {
      // Сортируем по дате и берем последний
      const sortedActs = clientActs.list
        .filter((act) => act.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      if (sortedActs.length > 0) {
        const lastAct = sortedActs[0]
        const lastDate = new Date(lastAct.date)
        const newDate = new Date(date)

        if (newDate <= lastDate) {
          return NextResponse.json(
            { error: 'Дата акта должна быть позже последнего существующего акта' },
            { status: 400 }
          )
        }
      }
    }

    const act = await nocodb.createRecord<Act>(serverEnv.NOCO_ACTS_TABLE_ID, {
      number: actData.number,
      date,
      amount: actData.amount,
      price: actData.price,
      clients_id: actData.clientId,
    })

    return NextResponse.json(act, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    console.error('Create act error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
