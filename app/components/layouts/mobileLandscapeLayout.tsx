import { Form, Link, Outlet, useLocation } from "@remix-run/react";
import type { FormEventHandler } from "react";
import { useRef } from "react";
import DesktopPlayerControls from "../audioplayer/desktopplayercontrols";
import Menu from "../menu";
import NavScreen from "../navScreen";
import type { LayoutParams } from "./layoutParams";

export default function MobileLandscapeLayout({
  episodes,
  search,
  audioPlayerParams,
}: LayoutParams) {
  const searchInput = useRef<HTMLInputElement>(null);
  const reselectText: FormEventHandler = (x) => {
    searchInput.current?.setSelectionRange(0, searchInput.current.value.length);
  };
  const location = useLocation();
  return (
    <main className="relative w-screen">
      <div className="pl-[33.3vw]">
        <div className="min-h-screen bg-white/50 px-4 pt-4 pb-[4.5rem] backdrop-blur-md dark:bg-transparent dark:backdrop-blur-none">
          <Outlet context={audioPlayerParams} />
        </div>
      </div>
      {audioPlayerParams.nowPlaying && (
        <div className="fixed bottom-0 right-0 h-16 w-[66.7vw] bg-white/50 px-2 pt-2 backdrop-blur-sm dark:bg-slate-800/50">
          <DesktopPlayerControls {...audioPlayerParams} />
        </div>
      )}
      {/* Side Panel */}
      <div className="fixed bottom-0 top-0 left-0 h-screen w-1/3 bg-redwall bg-cover px-4 pt-[9vw] pb-4">
        <div className="h-full w-full bg-gradient-to-tl from-slate-500 to-slate-400 p-2  shadow-[-5px_-5px_15px_0_rgba(0,0,0,0.5)] dark:from-slate-500 dark:to-slate-400">
          <div className="flex flex-col justify-between h-full bg-white dark:bg-slate-800">
            <NavScreen
              audioPlayerParams={audioPlayerParams}
              episodes={episodes}
            />
            {
              <div className="relative visible w-full p-2">
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
            }
          </div>
        </div>
      </div>
      <div className="neon fixed top-[2vw] left-0 right-0 w-1/3 -rotate-6 animate-buzz text-center font-neon text-white">
        {/* screen */}
        <Link to="/" className="text-[3.6vw] ">
          At The Drive-Thru
        </Link>
      </div>
      <div className="fixed right-0 left-auto p-2 pl-4 rounded-l-full rounded-r-none z-60 top-4 bg-white/50 backdrop-blur-sm dark:bg-slate-900/20">
        <Menu />
      </div>
    </main>
  );
}
