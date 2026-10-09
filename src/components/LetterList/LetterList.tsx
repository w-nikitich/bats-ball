import { cross } from "@/src/app/constants";

import { useLettersStore } from "@/src/providers/letters-store-provider";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

interface LetterListProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleOpenForm: () => void;
  handleOpenLetter: (id: string) => void;
}

export default function LetterList({
  isOpen = false,
  handleCloseModal,
  handleOpenForm,
  handleOpenLetter,
}: LetterListProps) {
  const letters = useLettersStore((state) => state.letters);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && handleCloseModal()}
    >
      <Dialog.Portal>
        <Dialog.Content
          className="flex flex-col items-center overflow-hidden rounded-3xl border border-gold p-6 text-white shadow-2xl sm:p-8"
          style={{
            height: "60rem",
            width: "50rem",
            backgroundColor: "black",
            position: "fixed",
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
          }}
        >
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
            <Dialog.Title
              className="col-start-2 text-center text-gold"
              style={{ fontSize: "2rem" }}
            >
              Love Letters
            </Dialog.Title>

            <Dialog.Close asChild>
              <Button
                type="button"
                variant="soft"
                color="gray"
                aria-label="Close dialog"
                className="col-start-3 justify-self-end cursor-pointer"
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                <img src={cross} width={30} height={30} alt="Close dialog" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex min-h-0 w-full flex-1">
            {letters.length > 0 ? (
              <div className="my-4 h-full w-full overflow-y-auto">
                {letters.map((letter) => (
                  <div
                    key={letter.id}
                    className="my-2 w-full rounded-xl border border-gold cursor-pointer"
                    style={{ padding: "8px" }}
                    onClick={() => handleOpenLetter(letter.id)}
                  >
                    <p className="text-gold">{letter.title}</p>

                    <div
                      className="flex gap-5 text-sm text-gray-300"
                      style={{ color: "#d1d5dc" }}
                    >
                      <span>From: {letter.from}</span>
                      <span>To: {letter.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-gold"
                style={{ justifyContent: "center", fontSize: "1.5rem" }}
              >
                <p>No letters</p>
              </div>
            )}
          </div>

          <button
            className="bg-gold text-black rounded-lg py-3"
            style={{ width: "20rem" }}
            onClick={handleOpenForm}
          >
            <p>Write a letter to your beloved one</p>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
