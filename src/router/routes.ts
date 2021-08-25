import { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home/index.vue";
import Page404 from "@/views/404/index.vue";
import Breathing from "@/views/Breathing/Index.vue";
import BreathingDetails from "@/views/Breathing/BreathingDetails.vue";
import BreathingGuide from "@/views/Breathing/BreathingGuide.vue";
import Settings from "@/views/Settings/Index.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/breathings",
    name: "breathings",
    component: Breathing,
  },
  {
    path: "/breathing/:id",
    name: "breathing",
    component: BreathingGuide,
  },
  {
    path: "/breathing/details/:id",
    name: "breathing details",
    component: BreathingDetails,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: Page404,
  },
];
