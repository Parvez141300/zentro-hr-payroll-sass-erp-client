
import { IDashboardSidebarNavSection } from "@/types/dashboard.type";
import { UserRole } from "@/types/enums.type";

const getDefaultDashboardRoute = (role: UserRole) => {
    switch (role) {
        case UserRole.PLATFORM_SUPER_ADMIN:
            return "/platform-super-admin/dashboard";
        case UserRole.SUPER_ADMIN:
            return "/super-admin/dashboard";
        case UserRole.HR_MANAGER:
            return "/hr-manager/dashboard";
        case UserRole.ACCOUNTANT:
            return "/accountant/dashboard";
        case UserRole.DEPARTMENT_HEAD:
            return "/department-head/dashboard";
        case UserRole.EMPLOYEE:
            return "/dashboard";
        default:
            return "/";
    }
}

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
            ]
        },
    ]
}

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
            }
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
]

const superAdminSidebarNavItems: IDashboardSidebarNavSection[] = [
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
        ]
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
                title: "Create Attendance",
                href: "/super-admin/dashboard/create-attendance",
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
            {
                title: "Generate Payroll",
                href: "/super-admin/dashboard/generate-payroll",
                icon: "HandCoins",
            }
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
]

const hrManagerSidebarNavItems: IDashboardSidebarNavSection[] = [
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
        ]
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
                title: "Create Attendance",
                href: "/hr-manager/dashboard/create-attendance",
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
]

const accountantSidebarNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Payroll",
        items: [
            {
                title: "Manage Payroll",
                href: "/accountant/dashboard/manage-payroll",
                icon: "Users",
            },
            {
                title: "Generate Payroll",
                href: "/accountant/dashboard/generate-payroll",
                icon: "HandCoins",
            }
        ],
    },
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/accountant/dashboard/get-all-employee",
                icon: "Users",
            },
        ],
    },
]

const departmentHeadSidebarNavItems: IDashboardSidebarNavSection[] = [
    {
        title: "Employee",
        items: [
            {
                title: "Manage Employee",
                href: "/department-head/dashboard/get-all-employee",
                icon: "Users",
            },
            {
                title: "Create Employee",
                href: "/department-head/dashboard/create-employee",
                icon: "Plus",
            }
        ],
    },
    {
        title: "Attendance",
        items: [
            {
                title: "Attendance",
                href: "/department-head/dashboard/all-attendance",
                icon: "UserRoundCheck",
            },
            {
                title: "Create Attendance",
                href: "/department-head/dashboard/create-attendance",
                icon: "Plus",
            },
        ],
    },
    {
        title: "Leave",
        items: [
            {
                title: "Leave",
                href: "/department-head/dashboard/all-leave",
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
]

const employeeSidebarNavItems: IDashboardSidebarNavSection[] = [
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
            {
                title: "Apply Leave",
                href: "/dashboard/apply-leave",
                icon: "Plus",
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
]

export const getDashboardNavItemsByRole = (role: UserRole) => {
    const DashboardCommonProtectedRoute = getDashboardCommonProtectedRoute(role);
    switch (role) {
        case UserRole.PLATFORM_SUPER_ADMIN:
            return [
                ...DashboardCommonProtectedRoute,
                ...platformSuperAdminSidebarNavItems
            ];
        case UserRole.SUPER_ADMIN:
            return [
                ...DashboardCommonProtectedRoute,
                ...superAdminSidebarNavItems
            ];
        case UserRole.HR_MANAGER:
            return [
                ...DashboardCommonProtectedRoute,
                ...hrManagerSidebarNavItems
            ];
        case UserRole.ACCOUNTANT:
            return [
                ...DashboardCommonProtectedRoute,
                ...accountantSidebarNavItems
            ];
        case UserRole.DEPARTMENT_HEAD:
            return [
                ...DashboardCommonProtectedRoute,
                ...departmentHeadSidebarNavItems
            ];
        case UserRole.EMPLOYEE:
            return [
                ...DashboardCommonProtectedRoute,
                ...employeeSidebarNavItems
            ];
            break;

        default:
            return [];
            break;
    }
}
