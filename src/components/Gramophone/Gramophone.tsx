import Image from "next/image";

export default function Gramophone() {
  return (
    <div className="relative">
      <Image
        src="/gramophone.svg"
        width={350}
        height={350}
        alt="Bats gramophone"
      />
      <div className="absolute bottom-21 left-30">
        <Image
          src="/disc_animated.svg"
          width={150}
          height={150}
          alt="Bats ball music"
        />
      </div>
    </div>
  );
}
