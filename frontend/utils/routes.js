export const adminRoutes = [
    {
        title: "Dashboard",
        path: "/admin",
    },
    {
        title: "Business",
        path: "/admin/business",
        subRoutes: [
            { title: "All Businesses", path: "/admin/business" },
            { title: "Add Business", path: "/admin/business/add" },
        ],
    },
    {
        title: "Resident",
        path: "/admin/resident",
        subRoutes: [
            { title: "All Residents", path: "/admin/resident" },
            { title: "Add Resident", path: "/admin/resident/add" },
        ],
    },
    {
        title: "Product",
        path: "/admin/product",
        subRoutes: [
            { title: "All Products", path: "/admin/product" },
            { title: "Add Product", path: "/admin/product/add" },
        ],
    },
    {
        title: "Vote",
        path: "/admin/vote",
    },
    {
        title: "Location",
        path: "/admin/location",
        subRoutes: [
            { title: "All Locations", path: "/admin/location" },
            { title: "Add Location", path: "/admin/location/add" },
        ],
    },
    {
        title: "Council",
        path: "/admin/council",
        subRoutes: [
            { title: "All Councils", path: "/admin/council" },
            { title: "Add Council", path: "/admin/council/add" },
        ],
    },
    {
        title: "Reports",
        path: "/admin/reports",
    },
];

export const businessRoutes = [
    {
        title: "Dashboard",
        path: "/business",
    },
    {
        title: "Product",
        path: "/business/product",
        subRoutes: [
            { title: "All Products", path: "/business/product" },
            { title: "Add Product", path: "/business/product/add" },
        ],
    },
    // {
    //     title: "Orders",
    //     path: "/business/orders",
    //     subRoutes: [
    //         { title: "All Orders", path: "/business/orders" },
    //         { title: "Add Order", path: "/business/orders/add" },
    //     ],
    // },
    // {
    //     title: "Reports",
    //     path: "/business/reports",
    // },
    // {
    //     title: "Settings",
    //     path: "/business/settings",
    // },
    {
        title: "Profile",
        path: "/business/profile",
    },
]


export const residentRoutes = [
    {
        title: "Dashboard",
        path: "/resident",
    },
    {
        title: "Product",
        path: "/resident/product",
    },
    {
        title: "Vote",
        path: "/resident/vote",
    },
    {
        title: "Profile",
        path: "/resident/profile",
    },
    // {
    //     title: "Settings",
    //     path: "/resident/settings",
    // },
    // {
    //     title: "Reports",
    //     pahth: "/resident/reports",
    // },
    // {
    //     title: "Profile",
    //     path: "/resident/profile",
    // },
]