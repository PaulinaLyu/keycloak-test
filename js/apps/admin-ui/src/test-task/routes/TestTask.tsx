import { lazy } from "react";
import type { Path } from "react-router-dom";
import type { AppRouteObject } from "../../routes";
import { generateEncodedPath } from "../../utils/generateEncodedPath";

export type TestTaskTab = "realm" | "users";

export type TestTaskParams = {
  realm: string;
  tab?: TestTaskTab;
};

const TestTaskSection = lazy(() => import("../TestTaskSection"));

export const TestTaskRoute: AppRouteObject = {
  path: "/:realm/test-task",
  element: <TestTaskSection />,
  handle: {
    access: ["view-realm", "query-users"],
    breadcrumb: (t) => t("test"),
  },
};

export const TestTaskRouteWithTab: AppRouteObject = {
  ...TestTaskRoute,
  path: "/:realm/test-task/:tab",
};

export const toTestTask = (params: TestTaskParams): Partial<Path> => {
  const path = params.tab ? TestTaskRouteWithTab.path : TestTaskRoute.path;

  return {
    pathname: generateEncodedPath(path, params),
  };
};
