"use client";

import { useEffect, useRef, useState } from "react";
import { getAudioInfo } from "@/src/app/actions/player";
import { audioList, loadingGif } from "@/src/app/constants";
import { TrackInfo } from "@/src/types";

interface PlaylistProps {
  ballStarted?: boolean;
  currentIndex?: number;
  onTrackChange?: (track: TrackInfo) => void;
  onPlayStateChange?: (playing: boolean) => void;
  onTrackEnded?: () => void;
}

export default function Playlist({ ballStarted }: PlaylistProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const loadTrack = async (index: number) => {
    const youtubeUrl = audioList[index];

    if (!youtubeUrl) return;

    setLoading(true);

    try {
      console.log("Loading YouTube URL:", youtubeUrl);

      const data = await getAudioInfo(youtubeUrl);

      console.log("getAudioInfo returned:", data);

      if (!data?.audioUrl) {
        console.error("Missing audio URL:", data);
        return;
      }

      setCurrentTrack({
        title: data.title,
        artist: data.artist,
        audioUrl: data.audioUrl,
      });
    } catch (error: unknown) {
      console.error("getAudioInfo failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ballStarted) {
      loadTrack(0);
    }
  }, [ballStarted]);

  useEffect(() => {
    if (currentTrack?.audioUrl && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay was blocked by browser policy:", err);
      });
    }
  }, [currentTrack]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleEnded = () => {
    setCurrentTime(0);

    const nextIndex = currentIndex + 1;
    if (nextIndex < audioList.length) {
      setCurrentIndex(nextIndex);
      loadTrack(nextIndex);
    } else {
      setCurrentIndex(0);
      loadTrack(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 text-gold rounded-xl max-w-md mx-auto shadow-lg">
      {loading && (
        <div className="flex gap-5">
          <img src={loadingGif} width={30} height={30} />
          <img
            src={loadingGif}
            className="transform -scale-x-100"
            width={30}
            height={30}
          />
        </div>
      )}

      {currentTrack && !loading && (
        <div className="text-center space-y-1">
          <p className="font-semibold text-lg line-clamp-1">
            {currentTrack.title}
          </p>
        </div>
      )}

      {currentTrack?.audioUrl && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}

      {currentTrack?.audioUrl && (
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-sm h-2 bg-gold rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      )}
    </div>
  );
}
