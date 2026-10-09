import { cross } from "@/src/app/constants";

import { useLettersStore } from "@/src/providers/letters-store-provider";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useState } from "react";

type CreateLetter = {
  title: string;
  from: string;
  to: string;
  text: string;
};

interface LetterFormProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleSendLetter: ({ title, from, to, text }: CreateLetter) => void;
}

export default function LetterForm({
  isOpen = false,
  handleCloseModal,
  handleSendLetter,
}: LetterFormProps) {
  const letters = useLettersStore((state) => state.letters);
  const createLetter = useLettersStore((state) => state.createLetter);
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [text, setText] = useState("");

  const handleAdd = ({ title, from, to, text }: CreateLetter) => {
    createLetter({
      id: crypto.randomUUID(),
      title: title,
      from: from,
      to: to,
      text: text,
    });
  };

  const handleSend = () => {
    if (!title || !from || !to || !text) return;
    handleSendLetter({ title, from, to, text });
    setTitle("");
    setFrom("");
    setTo("");
    setText("");
  };

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
              My Love Letter
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
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gold"
              style={{
                backgroundColor: "white",
                color: "black",
                marginTop: "30px",
                padding: "8px",
              }}
            />
            <div className="flex gap-10">
              <input
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-lg border border-gold"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "30px",
                  padding: "8px",
                }}
              />
              <input
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-lg border border-gold"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "30px",
                  padding: "8px",
                }}
              />
            </div>
            <TextArea
              placeholder="My Beloved Bat, ..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border border-gold rounded-lg"
              style={{
                backgroundColor: "white",
                color: "black",
                marginTop: "30px",
                padding: "8px",
              }}
              rows={20}
              cols={89}
            />
          </div>

          <Dialog.Close
            asChild
            className="bg-gold text-black rounded-lg py-3"
            style={{ width: "20rem" }}
          >
            <button onClick={handleSend}>Send</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
