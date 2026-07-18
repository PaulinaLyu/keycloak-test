import { lazy } from "react";
import type { AppRouteObject } from "../../routes";
import { TestTaskUserRoutePath } from "./TestTask";

const UserDetails = lazy(() => import("../UserDetails"));

export const TestTaskUserRoute: AppRouteObject = {
  path: TestTaskUserRoutePath,
  element: <UserDetails />,
  handle: {
    access: "query-users",
    breadcrumb: (t) => t("testTaskUserDetails"),
  },
};
