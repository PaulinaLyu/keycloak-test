import type { AppRouteObject } from "../routes";
import { TestTaskRoute, TestTaskRouteWithTab } from "./routes/TestTask";
import { TestTaskUserRoute } from "./routes/TestTaskUser";

const routes: AppRouteObject[] = [
  TestTaskRoute,
  TestTaskUserRoute,
  TestTaskRouteWithTab,
];

export default routes;
