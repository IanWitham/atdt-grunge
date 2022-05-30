import { MutableRefObject, useEffect } from "react";
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
  seeking: boolean;
  setSeeking: (x: boolean) => void;
};

export default function useAudioPlayer({
  nowPlaying,
  reactPlayerRef,
}: UseAudioPlayerParams) {
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);

  useEffect(() => {
    //console.log(progress, seeking);
    if (seeking) {
      reactPlayerRef.current?.seekTo(progress);
      setSeeking(false);
    }
  }, [progress, reactPlayerRef, seeking]);

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
    //console.log("restore seek");
    if (!nowPlaying?.link) {
      return;
    }
    const progressValue = localStorage.getItem(nowPlaying.link);
    if (progressValue === null) {
      return;
    }
    const progress: number = parseFloat(progressValue ?? "0");
    setProgress(progress);
    reactPlayerRef?.current?.seekTo(progress);
  };

  const result: UseAudioPlayerResult = {
    progress,
    setProgress,
    saveProgress,
    duration,
    setDuration,
    restoreSeek,
    seeking,
    setSeeking,
  };

  return result;
}
