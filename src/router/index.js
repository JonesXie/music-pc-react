import React from "react";
import { Redirect } from "react-router-dom";

import Xdiscover from "@/views/discover";
import Drecommend from "@/views/discover/c-views/recommend";
import Xfriend from "@/views/friend";
import Xmy from "@/views/my";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: Xdiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      {
        path: "/discover/recommend",
        component: Drecommend,
      },
    ],
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
