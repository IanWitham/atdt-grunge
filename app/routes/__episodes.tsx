import {
  Form,
  Outlet,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import ReactPlayer from "react-player/file";
import Sign from "~/sign2";
import type { ShowListItem } from "~/models/show.server";
import { getEpisodes } from "~/models/show.server";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type lunr from "lunr";
import type { FormEventHandler } from "react";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import EpisodeListing from "~/components/episodeListing";
import Menu from "~/components/menu";
import type FilePlayer from "react-player/file";
import type { Episode } from "podparse";

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
  isPaused: boolean;
  isSeeking: boolean;
};

export default function Index() {
  const { episodes } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const searchInput = useRef<HTMLInputElement>(null);
  const location = useLocation();
  console.log(location.pathname);

  // player state;
  const reactPlayerRef = useRef<FilePlayer | null>();
  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const durationSeconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  const durationMinutes = Math.floor((duration / 60) % 60)
    .toString()
    .padStart(2, "0");
  const durationHours = Math.floor((duration / 3600) % 60).toString();
  const formattedDuration = `${durationHours}:${durationMinutes}:${durationSeconds}`;
  const progressSeconds = Math.floor(progress % 60)
    .toString()
    .padStart(2, "0");
  const progressMinutes = Math.floor((progress / 60) % 60)
    .toString()
    .padStart(2, "0");
  const progressHours = Math.floor((progress / 3600) % 60).toString();
  const formattedProgress = `${progressHours}:${progressMinutes}:${progressSeconds}`;

  const play = (episode: Episode) => {
    setNowPlaying(episode);
    setIsPaused(false);
    //restoreSeek();
  };
  const pause = () => {
    setIsPaused(true);
  };
  const unpause = () => {
    setIsPaused(false);
  };
  const saveProgress = (playedSeconds: number) => {
    if (nowPlaying?.link && playedSeconds !== 0) {
      localStorage.setItem(nowPlaying.link, playedSeconds.toString());
    }
    if (!isSeeking) {
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

  const reselectText: FormEventHandler = (x) => {
    searchInput.current?.setSelectionRange(0, searchInput.current.value.length);
  };

  const outletContext: PlayerContext = {
    nowPlaying: nowPlaying?.link ?? null,
    play,
    pause,
    isPaused,
    isSeeking,
  };

  return (
    <main className="relative flex flex-row w-screen h-screen overflow-clip bg-gradient-to-t from-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-900 dark:to-black">
      <Menu />
      <div className="flex flex-row justify-around flex-grow flex-shrink max-h-screen min-h-screen overflow-clip lg:justify-start">
        <div className="relative h-screen overflow-clip">
          <div
            id="sign-area"
            className={`left-4 -mr-8 h-full origin-top-left -translate-x-3 -rotate-6 ${
              nowPlaying === null ? "translate-y-8" : ""
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
          {/* <div
            className={`absolute bottom-0 left-0 h-16 w-full bg-blue-300 ${
              nowPlaying === null ? "hidden" : ""
            }`}
          >
            {nowPlaying?.title ?? "NON"}
          </div> */}
        </div>
        <div
          id="show-notes"
          className="z-30 hidden pl-8 pr-2 shrink overflow-x-clip lg:block"
        >
          <article className="relative mt-24 h-[calc(100%-12em)] overflow-y-auto">
            <Outlet context={outletContext} />
          </article>

          <ReactPlayer
            ref={(player) => (reactPlayerRef.current = player)}
            onProgress={(progress) => saveProgress(progress.playedSeconds)}
            url={nowPlaying?.enclosure.url}
            playing={!isPaused && !isSeeking}
            onDuration={(d) => {
              setDuration(d);
              restoreSeek();
            }}
          />
        </div>
      </div>
      {nowPlaying !== null && (
        <div className="absolute bottom-0 left-0 flex flex-row justify-center w-full h-16 gap-8 -z-60 bg-slate-800">
          <div className="self-center text-slate-800 dark:text-slate-200">
            Now Playing: {nowPlaying?.title}
          </div>
          <div className="flex flex-row self-center gap-2">
            {!isPaused ? (
              <button
                title="Pause currently playing episode"
                onClick={() => pause()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-slate-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <button
                title="Resume currently playing episode"
                onClick={() => unpause()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-slate-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            <input
              onMouseDown={() => setIsSeeking(true)}
              onMouseUp={() => {
                reactPlayerRef.current?.seekTo(progress);
                setIsSeeking(false);
              }}
              onChange={(e) => setProgress(e.target.valueAsNumber)}
              min={0}
              max={duration}
              step={10}
              value={progress}
              title="Episode Progress"
              type="range"
              className="w-full"
            />
          </div>
          <div className="self-center font-spacemono text-slate-800 dark:text-slate-200">
            {formattedProgress} / {formattedDuration}
          </div>
        </div>
      )}
    </main>
  );
}
