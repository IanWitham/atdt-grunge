import { Form, Link, Outlet, useLocation } from "@remix-run/react";
import Menu from "../menu";
import Sign from "~/components/sign2";
import type { LayoutParams } from "./layoutParams";
import type { FormEventHandler } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import DesktopPlayerControls from "../audioplayer/desktopplayercontrols";
import MobilePlayerControls from "../audioplayer/mobileplayercontrols";
import NavScreen from "../navScreen";

export default function MainLayout({
  episodes,
  search,
  audioPlayerParams,
}: LayoutParams) {
  const searchInput = useRef<HTMLInputElement>(null);
  const reselectText: FormEventHandler = (x) => {
    searchInput.current?.setSelectionRange(0, searchInput.current.value.length);
  };

  const location = useLocation();

  const navRef = useRef<HTMLElement | null>();

  useEffect(() => {
    navRef.current?.scrollTo({ top: 0 });
  }, [location.pathname, location.search]);

  return (
    <main className="relative w-screen ">
      <div className="">
        <div className="fixed left-[min(-0.75em,_calc(50vw_-_30vh))] top-0 bottom-0">
          <div
            id="sign-area"
            className={`left-4 -mr-8 h-full origin-top-left -rotate-6 ${
              audioPlayerParams.nowPlaying === null
                ? "translate-y-8"
                : "lg:translate-y-8"
            }`}
          >
            <div className="translate-x-[-6.8vh]">
              <Sign />
            </div>
            <div className="neon absolute left-[4vh] top-[15vh] right-0 w-[60vh] -rotate-6 animate-buzz font-neon text-[6vh] text-white">
              <Link to="/">At The Drive-Thru</Link>
            </div>
            <div
              id="menu-screen"
              className="h-50 absolute top-[26.6vh] left-[7.7vh]  h-[65vh] w-[32.44vh] bg-gradient-to-tl from-slate-500 to-slate-400 p-4 shadow-[-10px_-10px_30px_0_rgba(0,0,0,0.5)] dark:from-slate-500 dark:to-slate-400 "
            >
              <div className="flex flex-col justify-between h-full bg-white dark:bg-slate-800">
                <NavScreen
                  audioPlayerParams={audioPlayerParams}
                  episodes={episodes}
                />

                <div
                  className={`relative w-full p-2 ${
                    location.pathname !== "/" ? "hidden lg:block" : ""
                  }`}
                >
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
        {/* Show notes area for desktop layout */}
        <div
          id="show-notes"
          className="z-30 flex-col hidden w-full pb-20 lg:flex"
        >
          <div className="flex flex-col gap-4">
            <article className="relative mt-24 ml-[65vh] overflow-y-auto rounded-l-3xl bg-white/50 p-8 backdrop-blur-lg dark:rounded-none dark:bg-transparent dark:p-0 dark:pr-4 dark:backdrop-blur-none">
              <Outlet context={audioPlayerParams} />
            </article>
          </div>
          {!!audioPlayerParams.nowPlaying && (
            <>
              <div className="-z-60 fixed left-[65vh] right-0 bottom-4 h-[4.5] max-w-[40rem] bg-white/50 p-4 text-xs backdrop-blur-sm dark:bg-slate-800/50">
                <DesktopPlayerControls {...audioPlayerParams} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="fixed left-0 p-2 pl-4 rounded-r-full z-60 top-4 bg-white/50 backdrop-blur-sm dark:bg-slate-900/20 lg:left-auto lg:right-0 lg:rounded-l-full lg:rounded-r-none">
        <Menu />
      </div>
      <>
        {audioPlayerParams.nowPlaying && (
          <>
            <div className="fixed bottom-0 left-0 right-0 w-screen h-16 px-2 pt-2 text-xs bg-white -z-60 dark:bg-slate-800 lg:hidden">
              <MobilePlayerControls {...audioPlayerParams} />
            </div>
          </>
        )}
      </>
    </main>
  );
}
