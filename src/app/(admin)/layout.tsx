import { ReactNode } from 'react'

export default function AdminGroupLayout({ children }: { children: ReactNode }) {
  // Этот layout обходит locale layout и подключается напрямую к корневому layout
  return <>{children}</>
}
