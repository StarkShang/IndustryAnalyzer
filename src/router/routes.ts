import { RouteConfig } from "vue-router";

export const routes: Array<RouteConfig> = [
    {
        path: "/technologies/:id",
        name: "TechnologyDetail",
        component: () => import("@/views/technology/TechnologyDetail.vue"),
    },
    {
        path: "/concepts/:id/corporations/:corp",
        name: "CorporationDetail",
        component: () => import("@/views/corporation/CorporationDetail.vue"),
    },
];
