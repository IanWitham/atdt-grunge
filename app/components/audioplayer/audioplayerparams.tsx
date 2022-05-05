import type { Episode } from "podparse";
import type { MutableRefObject } from "react";
import type ReactPlayer from "react-player/file";

export type AudioPlayerParams = {
  nowPlaying: Episode | null;
  paused: boolean;
  pause: () => void;
  unpause: () => void;
  reactPlayerRef: MutableRefObject<ReactPlayer | null | undefined>;
};
