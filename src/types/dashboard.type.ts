export interface IDashboardSidebarNavItem {
    title: string;
    href: string;
    icon: string;
}

export interface IDashboardSidebarNavSection {
    title: string;
    items: IDashboardSidebarNavItem[];
}