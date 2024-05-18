import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

// This is the RPC initializer to have full type safety between our frontend and backend
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!)