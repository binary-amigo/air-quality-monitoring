import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout() {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <AppSidebar data={[]} onItemClick={() => {}} />
    </SidebarProvider>
  )
}
