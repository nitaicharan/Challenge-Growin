import { SidebarProvider } from "./ui/sidebar"

export function DashboardProviders({
  children
}: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}