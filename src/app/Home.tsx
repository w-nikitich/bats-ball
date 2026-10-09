"use client";

import { startTransition, useEffect, useState } from "react";
import Gramophone from "../components/Gramophone/Gramophone";
import ShinyText from "../components/ui/ShinyText/ShinyText";
import {
  backgroundImages,
  indleBackgroundImage,
  loveLetter,
} from "./constants";
import Playlist from "../components/Playlist/Playlist";
import LetterList from "../components/LetterList/LetterList";
import LetterForm from "../components/LetterForm/LetterForm";
import { useLettersStore } from "../providers/letters-store-provider";
import { CreateLetter, Letter } from "../types";
import { saveLetterToDb } from "./actions/items";
import LetterItem from "../components/LetterItem/LetterItem";

export default function Home() {
  const [isBallStarted, setIsBallStarted] = useState(false);
  const [isLetterListOpen, setIsLetterListOpen] = useState(false);
  const [isLetterFormLOpen, setIsLetterFormOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [letter, setLetter] = useState("");
  const [bgImage, setBgImage] = useState(indleBackgroundImage);

  const letters = useLettersStore((state) => state.letters);
  const createLetter = useLettersStore((state) => state.createLetter);

  const handleAdd = ({ id, title, from, to, text }: Letter) => {
    createLetter({
      id: id,
      title: title,
      from: from,
      to: to,
      text: text,
    });
  };

  const selectedLetter = letters.find((value) => value.id === letter);

  let cycle = 0;

  const handleStartBall = () => {
    setIsBallStarted(true);
  };

  const handleOpenLetterList = () => {
    setIsLetterListOpen(true);
  };

  const handleCloseLetterList = () => {
    setIsLetterListOpen(false);
  };

  const handleOpenLetterForm = () => {
    setIsLetterListOpen(false);
    setIsLetterFormOpen(true);
  };

  const handleCloseLetterForm = () => {
    setIsLetterFormOpen(false);
  };

  const handleOpenLetter = (id: string) => {
    setLetter(id);
    setIsLetterOpen(true);
    setIsLetterListOpen(false);
  };

  const handleCloseLetter = () => {
    setIsLetterOpen(false);
  };

  const handleSendLetter = ({ title, from, to, text }: CreateLetter) => {
    const letterData = { title, from, to, text };

    startTransition(async () => {
      const result = await saveLetterToDb(letterData);

      if (result.success && result.letter) {
        const letter = {
          id: result.letter.id,
          title: result.letter.title,
          from: result.letter.from,
          to: result.letter.to,
          text: result.letter.text,
        };

        handleAdd(letter);
      }
    });
    setIsLetterFormOpen(false);
  };

  useEffect(() => {
    if (!isBallStarted) {
      setBgImage(indleBackgroundImage);
      return;
    }

    let cycle = 0;
    setBgImage(backgroundImages[0]);

    const interval = setInterval(() => {
      cycle = (cycle + 1) % backgroundImages.length;
      setBgImage(backgroundImages[cycle]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isBallStarted]);

  return (
    <div
      className="relative flex flex-col items-center py-10 h-screen w-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transitionProperty: "all",
        transitionDuration: "500ms",
        backgroundSize: "cover"
      }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full px-10">
        <div className="col-span-3 grid grid-cols-subgrid items-center">
          <ShinyText
            text="Bats In Love Ball"
            color="var(--gold)"
            shineColor="var(--shine)"
            spread={90}
            className="col-start-2 text-7xl text-center"
          />
          <button
            className="col-start-3 justify-self-end cursor-pointer"
            onClick={handleOpenLetterList}
          >
            <img src={loveLetter} width={70} height={70} alt="Love letter" />
          </button>
        </div>
      </div>

      <LetterList
        isOpen={isLetterListOpen}
        handleCloseModal={handleCloseLetterList}
        handleOpenForm={handleOpenLetterForm}
        handleOpenLetter={handleOpenLetter}
      />
      <LetterForm
        isOpen={isLetterFormLOpen}
        handleCloseModal={handleCloseLetterForm}
        handleSendLetter={handleSendLetter}
      />
      {selectedLetter && (
        <LetterItem
          isOpen={isLetterOpen}
          handleCloseModal={handleCloseLetter}
          letter={selectedLetter}
        />
      )}

      {isBallStarted ? (
        <div className="flex flex-col pt-10 items-center bg-black/70 border-2 border-gold rounded-3xl px-30 h-full">
          <Gramophone />
          <Playlist ballStarted />
        </div>
      ) : (
        <button
          className="px-6 py-3 my-[20%] bg-gold font-semibold rounded-lg transition-colors disabled:opacity-50"
          onClick={handleStartBall}
        >
          Start the Ball
        </button>
      )}
    </div>
  );
}
