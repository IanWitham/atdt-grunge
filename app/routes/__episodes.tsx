import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { ShowListItem } from "~/models/show.server";
import { getEpisodes } from "~/models/show.server";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type lunr from "lunr";
import { useState } from "react";
import { useRef } from "react";
import type { Episode } from "podparse";
import ReactPlayer from "react-player/file";
import useAudioPlayer from "~/components/audioplayer";
import type FilePlayer from "react-player/file";
import MainLayout from "~/components/layouts/mainLayout";
import type { AudioPlayerParams } from "~/components/audioplayer/audioplayerparams";
import MobileLandscapeLayout from "~/components/layouts/mobilelandscapelayout";
import SmallMobileLayout from "~/components/layouts/smallMobileLayout";

type LoaderData = {
  searchResult: lunr.Index.Result[];
  episodes: ShowListItem[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const result = await getEpisodes(search ?? "");
  if (!result) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(result);
};

export default function Index() {
  const { episodes } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [seeking] = useState<boolean>(false);

  const reactPlayerRef = useRef<FilePlayer | null>();

  const play = (episode: Episode) => {
    setNowPlaying(episode);
    setPaused(false);
  };
  const pause = () => {
    setPaused(true);
  };
  const unpause = () => {
    setPaused(false);
  };

  const audioPlayerResponse = useAudioPlayer({ nowPlaying, reactPlayerRef });

  const audioPlayerParams: AudioPlayerParams = {
    nowPlaying,
    pause,
    unpause,
    play,
    paused,
    reactPlayerRef,
    duration: audioPlayerResponse.duration,
    progress: audioPlayerResponse.progress,
    setProgress: audioPlayerResponse.setProgress,
  };

  //from-blue-300 to-blue-500
  return (
    <>
      <div className="fixed inset-0 bg-sky bg-cover dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-900 dark:to-black " />
      <div className="block mobile-landscape:hidden">
        <div className="hidden biggish-mobile:block">
          <MainLayout
            audioPlayerParams={audioPlayerParams}
            episodes={episodes}
            search={search}
          />
        </div>
        <div className="block text-red-500 biggish-mobile:hidden">
          <SmallMobileLayout
            audioPlayerParams={audioPlayerParams}
            episodes={episodes}
            search={search}
          />
        </div>
      </div>
      <div className="hidden mobile-landscape:block">
        <MobileLandscapeLayout
          audioPlayerParams={audioPlayerParams}
          episodes={episodes}
          search={search}
        />
      </div>
      <div className="hidden">
        <ReactPlayer
          ref={(player) => (reactPlayerRef.current = player)}
          onProgress={(progress) =>
            audioPlayerResponse.saveProgress(progress.playedSeconds)
          }
          url={nowPlaying?.enclosure.url}
          playing={!paused && !seeking}
          onEnded={() => {
            //audioPlayerResponse.setProgress(0);
            pause();
            audioPlayerResponse.saveProgress(0);
            reactPlayerRef.current?.seekTo(0);
          }}
          onDuration={(d) => {
            audioPlayerResponse.setDuration(d);
            audioPlayerResponse.restoreSeek();
          }}
        />
      </div>
    </>
  );
}
