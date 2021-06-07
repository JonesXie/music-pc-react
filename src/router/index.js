import Xdiscover from "@/views/discover";
import Xfriend from "@/views/friend";
import Xmy from "@/views/my";

const routes = [
  {
    path: "/",
    exact: true,
    component: Xdiscover,
  },
  {
    path: "/my",
    exact: true,
    component: Xmy,
  },
  {
    path: "/friend",
    exact: true,
    component: Xfriend,
  },
];

export default routes;
