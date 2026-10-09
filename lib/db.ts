import { serverEnv } from "@/envConfig";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: serverEnv.databaseUrl,
});
