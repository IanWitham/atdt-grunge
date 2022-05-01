import { createContext, useContext, useRef, useState } from "react";
import type { ReactNode, MutableRefObject } from "react";
import type { Episode } from "podparse";
import type FilePlayer from "react-player/file";
import react from "react";

type NowPlayingContextType = [
  Episode | null | undefined,
  boolean,
  (episode: Episode) => void,
  () => void,
  (playedSeconds: number) => void,
  MutableRefObject<FilePlayer | undefined | null>
];

const NowPlayingContext = createContext<NowPlayingContextType | undefined>(
  undefined
);

export function NowPlayingProvider({ children }: { children: ReactNode }) {
  const [episode, setEpisode] = useState<Episode | null>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const reactPlayerRef = useRef<FilePlayer | undefined | null>();

  const handlePlayEpisode = (episode: Episode) => {
    setIsPlaying(false);
    console.log("in handlePlayEpisode!", episode.title);
    setEpisode(episode);
    const progress: number = parseFloat(
      localStorage.getItem(episode.guid) ?? "0.0"
    );
    console.log("Progress loaded:", episode.guid, progress);
    if (reactPlayerRef?.current) {
      console.log(reactPlayerRef.current);
      console.log("Seeking last played point:", progress);
      reactPlayerRef?.current.seekTo(progress, "seconds");

      console.log("current position", reactPlayerRef.current.getCurrentTime());
    } else {
      console.log("hey no reactplayer ref! ☹️");
    }

    setIsPlaying(true);
  };

  const handlePauseEpisode = () => {
    setIsPlaying(false);
  };

  const saveProgress = (playedSeconds: number) => {
    if (playedSeconds === 0) {
      return;
    }
    if (episode?.guid) {
      localStorage.setItem(episode.guid, playedSeconds.toString());
      console.log("progress saved.", episode.guid, playedSeconds.toString());
    }
  };

  return (
    <NowPlayingContext.Provider
      value={[
        episode,
        isPlaying,
        handlePlayEpisode,
        handlePauseEpisode,
        saveProgress,
        reactPlayerRef,
      ]}
    >
      {children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext);
  if (context === undefined) {
    throw new Error("useNowPlaying must be used withing a NowPlayingProvidor");
  }
  return context;
}
