"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getIconComponent } from "@/lib/iconMapper";
import { IDashboardSidebarNavSection } from "@/types/dashboard.type";
import { cn } from "@/lib/utils";

interface NavMainProps {
  items: IDashboardSidebarNavSection[];
  className?: string;
}

export function NavMain({ items, className }: NavMainProps) {
  const pathname = usePathname();

  // Check if a path is active
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <SidebarGroup className={cn("px-0", className)}>
      <SidebarMenu>
        {items.map((section, sectionIndex) => {
          return (
            <SidebarMenuItem key={sectionIndex}>
              {/* Section Header */}
              {section.title && (
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    {section.title}
                  </p>
                </div>
              )}

              {/* Section Items */}
              {section.items && section.items.length > 0 && (
                <SidebarMenuSub className="space-y-0.5">
                  {section.items.map((item, itemIndex) => {
                    const Icon = getIconComponent(item.icon);
                    const active = isActive(item.href);

                    return (
                      <SidebarMenuSubItem key={itemIndex}>
                        <Link href={item.href}
                          className={cn(
                            "group relative h-9 w-full transition-all duration-200",
                            "hover:bg-secondary/50 hover:text-foreground flex items-center gap-3 px-2 rounded",
                            active && [
                              "bg-primary/10 text-primary",
                              "hover:bg-primary/15 hover:text-primary",
                              "before:absolute before:left-0 before:top-1/2 before:h-6 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-primary",
                            ],
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              active
                                ? "text-primary"
                                : "text-muted-foreground group-hover:text-foreground",
                            )}
                          />
                          <span
                            className={cn(
                              "text-sm transition-colors",
                              active
                                ? "font-medium text-foreground"
                                : "text-muted-foreground group-hover:text-foreground",
                            )}
                          >
                            {item.title}
                          </span>
                          {active && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </Link>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
