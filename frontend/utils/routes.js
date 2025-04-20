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