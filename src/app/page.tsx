import Home from "./Home";
import { LettersStoreProvider } from "../providers/letters-store-provider";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  const letters = await prisma.letter.findMany();

  return (
    <LettersStoreProvider initialLetters={letters}>
      <Home />
    </LettersStoreProvider>
  );
}
