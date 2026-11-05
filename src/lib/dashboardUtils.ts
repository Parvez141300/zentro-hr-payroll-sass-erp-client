import { IDashboardSidebarNavSection } from "@/types/dashboard.type";
import { SubscriptionPlan, UserRole } from "@/types/enums.type";
import { IUser } from "@/types/user.type";

// ===============================================================
// 1. Default dashboard route per role
// ===============================================================
const getDefaultDashboardRoute = (role: UserRole) => {
    switch (role) {
        case UserRole.PLATFORM_SUPER_ADMIN:
            return "/platform-super-admin/dashboard";
        case UserRole.SUPER_ADMIN:
            return "/super-admin/dashboard";
        case UserRole.HR_MANAGER:
            return "/hr-manager/dashboard";
        // case UserRole.ACCOUNTANT:
        //     return "/accountant/dashboard";
        case UserRole.DEPARTMENT_HEAD:
            return "/department-head/dashboard";
        case UserRole.EMPLOYEE:
            return "/dashboard";
        default:
            return "/";
    }
};

export const getDashboardCommonProtectedRoute = (role: UserRole) => {
    const commonRoute = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: commonRoute,
                    icon: "LayoutDashboard",
                },
                {
                    title: "Profile",
                    href: "/profile",
                    icon: "User",
                },
            ],
        },
    ];
};

// ===============================================================
// 2. Platform Super Admin (NOT plan-scoped — always full access)
// ===============================================================
const platformSuperAdminSidebarNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Companies",
        items: [
            {
                title: "Manage Companies",
                href: "/platform-super-admin/dashboard/manage-companies",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Subscription",
        items: [
            {
                title: "Manage Subscription Plan",
                href: "/platform-super-admin/dashboard/manage-subscription-plan",
                icon: "CreditCard",
            },
            {
                title: "Create Subscription Plan",
                href: "/platform-super-admin/dashboard/create-subscription-plan",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Users",
        items: [
            {
                title: "Manage Users",
                href: "/platform-super-admin/dashboard/manage-users",
                icon: "UserRoundCog",
            },
        ],
    },
];

// ===============================================================
// 3. SUPER_ADMIN — FREE plan
// ===============================================================
const superAdminFreeNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/super-admin/dashboard/company-details",
                icon: "Factory",
            },
            {
                title: "Edit Company",
                href: "/super-admin/dashboard/edit-company",
                icon: "Edit",
            },
        ],
    },
    {
        title: "Department",
        items: [
            {
                title: "Manage Department",
                href: "/super-admin/dashboard/manage-department",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Designation",
        items: [
            {
                title: "Manage Designation",
                href: "/super-admin/dashboard/manage-designation",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/super-admin/dashboard/manage-employee",
                icon: "Users",
            },
            {
                title: "Create Employee",
                href: "/super-admin/dashboard/create-employee",
                icon: "Plus",
            },
        ],
    },
];

// ===============================================================
// 4. SUPER_ADMIN — BASIC / PRO / ENTERPRISE (full set)
// ===============================================================
const superAdminFullNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/super-admin/dashboard/company-details",
                icon: "Factory",
            },
            {
                title: "Edit Company",
                href: "/super-admin/dashboard/edit-company",
                icon: "Edit",
            },
        ],
    },
    {
        title: "Department",
        items: [
            {
                title: "Manage Department",
                href: "/super-admin/dashboard/manage-department",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Designation",
        items: [
            {
                title: "Manage Designation",
                href: "/super-admin/dashboard/manage-designation",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Attendance",
        items: [
            {
                title: "Manage Attendance",
                href: "/super-admin/dashboard/manage-attendance",
                icon: "UserRoundCheck",
            },
            {
                title: "Mark Attendance",
                href: "/super-admin/dashboard/mark-attendance",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Leave",
        items: [
            {
                title: "Manage Leave",
                href: "/super-admin/dashboard/manage-leave",
                icon: "Users",
            },
            {
                title: "Manage Leave Type",
                href: "/super-admin/dashboard/manage-leave-type",
                icon: "Users",
            },
        ],
    },
    {
        title: "Payroll",
        items: [
            {
                title: "Manage Payroll",
                href: "/super-admin/dashboard/manage-payroll",
                icon: "Users",
            },
        ],
    },
    {
        title: "Hr Manager",
        items: [
            {
                title: "Manage Hr Manager",
                href: "/super-admin/dashboard/manage-hr-manager",
                icon: "Users",
            },
            {
                title: "Create Hr Manager",
                href: "/super-admin/dashboard/create-hr-manager",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Accountant",
        items: [
            {
                title: "Manage Accountant",
                href: "/super-admin/dashboard/manage-accountant",
                icon: "Users",
            },
            {
                title: "Create Accountant",
                href: "/super-admin/dashboard/create-accountant",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Department Head",
        items: [
            {
                title: "Manage Department Head",
                href: "/super-admin/dashboard/manage-department-head",
                icon: "Users",
            },
            {
                title: "Create Department Head",
                href: "/super-admin/dashboard/create-department-head",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/super-admin/dashboard/manage-employee",
                icon: "Users",
            },
            {
                title: "Create Employee",
                href: "/super-admin/dashboard/create-employee",
                icon: "Plus",
            },
        ],
    },
];

// ===============================================================
// 5. HR_MANAGER — FREE plan
// ===============================================================
const hrManagerFreeNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/hr-manager/dashboard/company-details",
                icon: "Factory",
            },
        ],
    },
    {
        title: "Department",
        items: [
            {
                title: "Manage Department",
                href: "/hr-manager/dashboard/manage-department",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Designation",
        items: [
            {
                title: "Manage Designation",
                href: "/hr-manager/dashboard/manage-designation",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/hr-manager/dashboard/manage-employee",
                icon: "Users",
            },
            {
                title: "Create Employee",
                href: "/hr-manager/dashboard/create-employee",
                icon: "Plus",
            },
        ],
    },
];

// ===============================================================
// 6. HR_MANAGER — BASIC / PRO / ENTERPRISE (full set)
// ===============================================================
const hrManagerFullNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/hr-manager/dashboard/company-details",
                icon: "Factory",
            },
        ],
    },
    {
        title: "Department",
        items: [
            {
                title: "Manage Department",
                href: "/hr-manager/dashboard/manage-department",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Designation",
        items: [
            {
                title: "Manage Designation",
                href: "/hr-manager/dashboard/manage-designation",
                icon: "Building2",
            },
        ],
    },
    {
        title: "Attendance",
        items: [
            {
                title: "Manage Attendance",
                href: "/hr-manager/dashboard/manage-attendance",
                icon: "UserRoundCheck",
            },
            {
                title: "Mark Attendance",
                href: "/hr-manager/dashboard/mark-attendance",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Leave",
        items: [
            {
                title: "Manage Leave",
                href: "/hr-manager/dashboard/manage-leave",
                icon: "Users",
            },
        ],
    },
    {
        title: "Department Head",
        items: [
            {
                title: "Manage Department Head",
                href: "/hr-manager/dashboard/manage-department-head",
                icon: "Users",
            },
            {
                title: "Create Department Head",
                href: "/hr-manager/dashboard/create-department-head",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/hr-manager/dashboard/manage-employee",
                icon: "Users",
            },
            {
                title: "Create Employee",
                href: "/hr-manager/dashboard/create-employee",
                icon: "Plus",
            },
        ],
    },
];

// ===============================================================
// 7. DEPARTMENT_HEAD — FREE plan
// ===============================================================
const departmentHeadFreeNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/department-head/dashboard/company-details",
                icon: "Factory",
            },
        ],
    },
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/department-head/dashboard/manage-employee",
                icon: "Users",
            },
            {
                title: "Create Employee",
                href: "/department-head/dashboard/create-employee",
                icon: "Plus",
            },
        ],
    },
];

// ===============================================================
// 8. DEPARTMENT_HEAD — BASIC / PRO / ENTERPRISE (full set)
// ===============================================================
const departmentHeadFullNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/department-head/dashboard/company-details",
                icon: "Factory",
            },
        ],
    },
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/department-head/dashboard/manage-employee",
                icon: "Users",
            },
            {
                title: "Create Employee",
                href: "/department-head/dashboard/create-employee",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Attendance",
        items: [
            {
                title: "Attendance",
                href: "/department-head/dashboard/manage-attendance",
                icon: "UserRoundCheck",
            },
            {
                title: "Mark Attendance",
                href: "/department-head/dashboard/mark-attendance",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Leave",
        items: [
            {
                title: "Leave",
                href: "/department-head/dashboard/manage-leave",
                icon: "Users",
            },
        ],
    },
    {
        title: "Department Head",
        items: [
            {
                title: "All Department Head",
                href: "/department-head/dashboard/all-department-head",
                icon: "Users",
            },
        ],
    },
];

// ===============================================================
// 9. EMPLOYEE — FREE plan
// ===============================================================
const employeeFreeNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/dashboard/company-details",
                icon: "Factory",
            },
        ],
    },
    {
        title: "Attendance",
        items: [
            {
                title: "Attendance",
                href: "/dashboard/attendance",
                icon: "UserRoundCheck",
            },
        ],
    },
];

// ===============================================================
// 10. EMPLOYEE — BASIC / PRO / ENTERPRISE (full set)
// ===============================================================
const employeeFullNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Company",
        items: [
            {
                title: "Company Details",
                href: "/dashboard/company-details",
                icon: "Factory",
            },
        ],
    },
    {
        title: "Attendance",
        items: [
            {
                title: "Attendance",
                href: "/dashboard/attendance",
                icon: "UserRoundCheck",
            },
        ],
    },
    {
        title: "Leave",
        items: [
            {
                title: "Leave",
                href: "/dashboard/leave",
                icon: "Users",
            },
        ],
    },
    {
        title: "Payroll",
        items: [
            {
                title: "Payroll",
                href: "/dashboard/payroll",
                icon: "CircleDollarSign",
            },
        ],
    },
];

// ===============================================================
// 11. Plan helper + role/plan resolver
// ===============================================================
const isFreePlan = (plan?: SubscriptionPlan | null): boolean =>
    !plan || plan === SubscriptionPlan.FREE;

const getRoleNavItemsByPlan = (
    role: UserRole,
    plan: SubscriptionPlan | null | undefined,
): IDashboardSidebarNavSection[] => {
    const free = isFreePlan(plan);

    switch (role) {
        case UserRole.PLATFORM_SUPER_ADMIN:
            // Platform-level — not tied to a tenant subscription plan.
            return platformSuperAdminSidebarNavItems;

        case UserRole.SUPER_ADMIN:
            return free ? superAdminFreeNavItems : superAdminFullNavItems;

        case UserRole.HR_MANAGER:
            return free ? hrManagerFreeNavItems : hrManagerFullNavItems;

        case UserRole.DEPARTMENT_HEAD:
            return free ? departmentHeadFreeNavItems : departmentHeadFullNavItems;

        case UserRole.EMPLOYEE:
            return free ? employeeFreeNavItems : employeeFullNavItems;

        // ACCOUNTANT currently has no nav items defined — uncomment when ready.
        // case UserRole.ACCOUNTANT:
        //     return free ? accountantFreeNavItems : accountantFullNavItems;

        default:
            return [];
    }
};

// ===============================================================
// 12. Public API — main export used by the sidebar
// ===============================================================
export const getDashboardNavItemsByRole = (userInfo: IUser) => {
    const role = userInfo.role;
    const companyInfo = userInfo.company;
    const plan = companyInfo?.subscriptionPlan as SubscriptionPlan | undefined;

    const commonRoutes = getDashboardCommonProtectedRoute(role);
    const roleNavItems = getRoleNavItemsByPlan(role, plan);

    return [...commonRoutes, ...roleNavItems];
};

// ===============================================================
// 13. Helper for route-guarding (middleware / layout)
//     Use this so the sidebar and the route protection stay in sync.
// ===============================================================
export const getAccessibleHrefs = (userInfo: IUser): string[] => {
    const sections = getDashboardNavItemsByRole(userInfo);
    return sections.flatMap((section) => section.items.map((item) => item.href));
};

export const canAccessRoute = (userInfo: IUser, pathname: string): boolean => {
    const accessible = getAccessibleHrefs(userInfo);
    return accessible.some(
        (href) => pathname === href || pathname.startsWith(`${href}/`),
    );
};

export { getDefaultDashboardRoute };