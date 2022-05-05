import type { AudioPlayerParams } from "./audioplayer/audioplayerparams";
import type FilePlayer from "react-player/file";
import type { PlayerControlsParams } from "./audioplayer/playercontrolsparams";
import { useRef, useState } from "react";

export default function useAudioPlayer({
  nowPlaying,
  paused,
  pause,
  unpause,
  reactPlayerRef,
}: AudioPlayerParams) {
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

  const playerControlParams: PlayerControlsParams = {
    pause,
    unpause,
    nowPlaying,
    reactPlayerRef,
    paused,
    progress,
    duration,
    setProgress,
  };

  return { playerControlParams, saveProgress, restoreSeek, setDuration };
}
