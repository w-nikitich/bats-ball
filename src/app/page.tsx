import { pool } from "@/lib/db";
import Home from "./Home";
import { LettersStoreProvider } from "../providers/letters-store-provider";
import { Theme } from "@radix-ui/themes";

export default async function Page() {
  const { rows } = await pool.query("SELECT * FROM letters");
  console.log(rows);
  return (
    <Theme>
      <LettersStoreProvider initialLetters={rows}>
        <Home />
      </LettersStoreProvider>
    </Theme>
  );
}
