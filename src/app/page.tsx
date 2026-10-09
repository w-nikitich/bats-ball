import { pool } from "@/lib/db";
import Home from "./Home";
import { LettersStoreProvider } from "../providers/letters-store-provider";
import { Theme } from "@radix-ui/themes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  const letters = await prisma.letter.findMany();

  return (
    <Theme>
      <LettersStoreProvider initialLetters={letters}>
        <Home />
      </LettersStoreProvider>
    </Theme>
  );
}
