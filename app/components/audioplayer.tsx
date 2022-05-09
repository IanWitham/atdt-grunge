import type { MutableRefObject } from "react";
import { useState } from "react";
import type { Episode } from "podparse";
import type ReactPlayer from "react-player/file";

type UseAudioPlayerParams = {
  nowPlaying: Episode | null;
  reactPlayerRef: MutableRefObject<ReactPlayer | null | undefined>;
};

type UseAudioPlayerResult = {
  progress: number;
  setProgress: (progressSeconds: number) => void;
  duration: number;
  setDuration: (durationSeconds: number) => void;
  saveProgress: (playedSeconds: number) => void;
  restoreSeek: () => void;
};

export default function useAudioPlayer({
  nowPlaying,
  reactPlayerRef,
}: UseAudioPlayerParams) {
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seeking] = useState<boolean>();

  const saveProgress = (playedSeconds: number) => {
    if (nowPlaying?.link && playedSeconds !== 0) {
      localStorage.setItem(nowPlaying.link, playedSeconds.toString());
    }
    if (!seeking) {
      setProgress(playedSeconds);
    }
  };

  const restoreSeek = () => {
    setProgress(0);
    console.log("restore seek");
    if (!nowPlaying?.link) {
      return;
    }
    const progressValue = localStorage.getItem(nowPlaying.link);
    if (progressValue === null) {
      return;
    }
    const progress: number = parseFloat(progressValue ?? "0");
    reactPlayerRef?.current?.seekTo(progress);
    setProgress(progress);
  };

  const result: UseAudioPlayerResult = {
    progress,
    setProgress,
    saveProgress,
    duration,
    setDuration,
    restoreSeek,
  };

  return result;
}
