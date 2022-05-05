import {
  Form,
  Outlet,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import Sign from "~/sign2";
import type { ShowListItem } from "~/models/show.server";
import { getEpisodes } from "~/models/show.server";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type lunr from "lunr";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useRef } from "react";
import EpisodeListing from "~/components/episodeListing";
import Menu from "~/components/menu";
import type { Episode } from "podparse";
import AudioPlayer from "~/components/audioplayer";
import ReactPlayer from "react-player/file";
import useAudioPlayer from "~/components/audioplayer";
import FilePlayer from "react-player/file";
import DesktopPlayerControls from "~/components/audioplayer/desktopplayercontrols";
import MobilePlayerControls from "~/components/audioplayer/mobileplayercontrols";

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

export type PlayerContext = {
  nowPlaying: string | null;
  play: (episode: Episode) => void;
  pause: () => void;
  paused: boolean;
  seeking: boolean;
};

export default function Index() {
  const { episodes } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const searchInput = useRef<HTMLInputElement>(null);
  const location = useLocation();
  console.log(location.pathname);

  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [seeking] = useState<boolean>(false);

  const reselectText: FormEventHandler = (x) => {
    searchInput.current?.setSelectionRange(0, searchInput.current.value.length);
  };

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

  const { playerControlParams, restoreSeek, saveProgress, setDuration } =
    useAudioPlayer({ nowPlaying, paused, pause, unpause, reactPlayerRef });

  const outletContext: PlayerContext = {
    nowPlaying: nowPlaying?.link ?? null,
    play,
    pause,
    paused,
    seeking,
  };

  //from-blue-300 to-blue-500
  return (
    <main className="relative w-screen h-screen bg-cover overflow-clip bg-sky dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-900 dark:to-black">
      <Menu />
      <div className="flex flex-row justify-around w-screen max-h-screen min-h-screen lg:justify-start">
        <div className="relative h-screen ">
          <div
            id="sign-area"
            className={`left-4 -mr-8 h-full origin-top-left -translate-x-3 -rotate-6 ${
              nowPlaying === null ? "translate-y-8" : "lg:translate-y-8"
            }`}
          >
            <div className="translate-x-[-6.8vh]">
              <Sign />
            </div>
            <div className="neon absolute left-[4vh] top-[15vh] right-0 w-[50vh] -rotate-6 animate-buzz font-neon text-[6vh] text-white">
              <span>At The Drive-Thru</span>
            </div>
            <div
              id="menu-screen"
              className="h-50 absolute top-[26.6vh] left-[7.7vh]  h-[65vh] w-[32.44vh] bg-gradient-to-tl from-slate-500 to-slate-400 p-4 shadow-[-10px_-10px_30px_0_rgba(0,0,0,0.5)] dark:from-slate-500 dark:to-slate-400 "
            >
              <div className="flex flex-col justify-between h-full bg-white dark:bg-slate-800">
                <nav className="p-2 overflow-y-auto menu-screen">
                  <div
                    className={`${
                      location.pathname !== "/" ? "flex lg:hidden" : "hidden"
                    } w-full flex-col gap-2`}
                  >
                    <Outlet context={outletContext} />
                  </div>
                  <div
                    className={`${
                      location.pathname !== "/" ? "hidden lg:flex" : "flex"
                    } w-full flex-col gap-8`}
                  >
                    {episodes.map((x) => (
                      <EpisodeListing key={x.link} showListItem={x} />
                    ))}
                  </div>
                </nav>
                <div className="relative w-full p-2 lg:visible">
                  <Form onSubmit={reselectText}>
                    <input
                      ref={searchInput}
                      onFocus={reselectText}
                      name="search"
                      defaultValue={search ?? ""}
                      placeholder="Search"
                      inputMode="search"
                      type="text"
                      className="w-full px-10 py-2 bg-transparent border rounded-full border-slate-800 font-inter text-slate-800 dark:border-slate-200 dark:text-slate-200"
                    />
                  </Form>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 left-0 w-5 h-5 my-auto ml-5 text-slate-800 dark:text-slate-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <Form
                    onSubmit={() =>
                      searchInput?.current && (searchInput.current.value = "")
                    }
                    className="absolute top-0 bottom-0 right-0 w-5 h-5 my-auto mr-5 text-slate-800 dark:text-slate-200"
                  >
                    <button
                      title="Clear Search"
                      type="submit"
                      className="absolute top-0 bottom-0 right-0"
                    >
                      {search && search !== "" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 my-auto text-slate-800 dark:text-slate-200"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="show-notes"
          className="z-30 flex-1 hidden w-full pl-0 pr-2 overflow-x-clip dark:pl-0 lg:flex xl:pl-6 dark:xl:pl-8"
        >
          <div className="flex flex-col max-w-xl gap-4">
            <article className="relative mt-24 h-[calc(100%-12em)] overflow-y-auto rounded-3xl bg-white/50 p-8 backdrop-blur-lg dark:rounded-none dark:bg-transparent dark:p-0 dark:pr-4">
              <Outlet context={outletContext} />
            </article>
            {!!nowPlaying && (
              <>
                <div className="-z-60 hidden h-16 max-w-[33rem] flex-col px-2 pt-2 text-xs lg:flex xl:max-w-xl">
                  <DesktopPlayerControls {...playerControlParams} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <>
        {!!nowPlaying && (
          <>
            <div className="absolute bottom-0 left-0 right-0 flex flex-col w-screen h-16 px-2 pt-2 text-xs bg-blue-500 -z-60 dark:bg-slate-800 lg:hidden">
              <MobilePlayerControls {...playerControlParams} />
            </div>
          </>
        )}
      </>
      );
      <ReactPlayer
        ref={(player) => (reactPlayerRef.current = player)}
        onProgress={(progress) => saveProgress(progress.playedSeconds)}
        url={nowPlaying?.enclosure.url}
        playing={!paused && !seeking}
        onDuration={(d) => {
          setDuration(d);
          restoreSeek();
        }}
      />
    </main>
  );
}
