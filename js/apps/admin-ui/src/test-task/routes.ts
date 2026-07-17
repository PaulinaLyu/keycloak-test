import type { AppRouteObject } from "../routes";
import { TestTaskRoute, TestTaskRouteWithTab } from "./routes/TestTask";

const routes: AppRouteObject[] = [TestTaskRoute, TestTaskRouteWithTab];

export default routes;
