import { Calendar, Home } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Define types for MenuItem and SubMenuItem
interface SubMenuItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType;
  subItems?: SubMenuItem[];
}

// Define the prop types for AppSidebar
interface AppSidebarProps {
  data: { date: string; _id: string }[];
  onItemClick: (item: SubMenuItem) => void;
}

export function AppSidebar({ data, onItemClick }: AppSidebarProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const items: MenuItem[] = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "History",
      url: "",
      icon: Calendar,
      subItems: data.slice(0, 30).map((item) => {
        const dateObj = new Date(item.date);
        // const formattedDate = dateObj.toLocaleDateString("en-GB").slice(0, 8);
        // const formattedTime = dateObj.toLocaleTimeString("en-GB");

        return {
          title: `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`,
          url: item._id,
        };
      }),
    },
  ];

  const toggleHistory = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setIsHistoryOpen((prev) => !prev);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      onClick={item.title === "History" ? toggleHistory : undefined}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.title === "History" && isHistoryOpen && (
                    <div style={{ paddingLeft: "20px" }}>
                      {item.subItems &&
                        item.subItems.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onItemClick(subItem); // Pass subItem to main component
                                }}
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
