import type { Episode } from "podparse";
import type { MutableRefObject } from "react";
import type ReactPlayer from "react-player/file";

export type AudioPlayerParams = {
  nowPlaying: Episode | null;
  paused: boolean;
  play: (episode: Episode) => void;
  pause: () => void;
  unpause: () => void;
  reactPlayerRef: MutableRefObject<ReactPlayer | null | undefined>;
  progress: number;
  setProgress: (x: number) => void;
  duration: number;
};
