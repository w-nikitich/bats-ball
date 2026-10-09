import { cross } from "@/src/app/constants";

import { useLettersStore } from "@/src/providers/letters-store-provider";
import { Letter } from "@/src/types";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useState } from "react";

interface LetterItemProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  letter: Letter;
}

export default function LetterItem({
  isOpen = false,
  handleCloseModal,
  letter,
}: LetterItemProps) {
  const letters = useLettersStore((state) => state.letters);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && handleCloseModal()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

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
              {letter.title}
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

          <div className="flex flex-col gap-4 w-full min-h-0 flex-1">
            <p className="text-gold">From: {letter.from}</p>
            <p className="text-gold">To: {letter.to}</p>
            <TextArea
              placeholder="My Beloved Bat, ..."
              value={letter.text}
              className="text-gold"
              rows={30}
              cols={89}
              disabled
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
