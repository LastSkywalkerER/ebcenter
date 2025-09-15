import type { LayoutProps } from '@/shared/types/ui'

export default function AdminGroupLayout({ children }: LayoutProps) {
  // Этот layout обходит locale layout и подключается напрямую к корневому layout
  return <>{children}</>
}
