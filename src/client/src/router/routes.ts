import { RouteConfig } from "vue-router";

export const routes: RouteConfig[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/home/Home.vue"),
    },
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
    {
        path: "/concepts/:id",
        name: "ConceptDetail",
        component: () => import("@/views/concept/ConceptDetail.vue"),
    }
];
