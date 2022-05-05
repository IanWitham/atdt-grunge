import type { Episode } from "podparse";
import type { MutableRefObject } from "react";
import type ReactPlayer from "react-player/file";

export type PlayerControlsParams = {
  pause: () => void;
  unpause: () => void;
  nowPlaying: Episode | null;
  paused: boolean;
  reactPlayerRef: MutableRefObject<ReactPlayer | null | undefined>;
  progress: number;
  setProgress: (x : number) => void;
  duration: number;
};
