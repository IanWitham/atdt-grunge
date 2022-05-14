import { Link, Outlet, useLocation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import type { ShowListItem } from "~/models/show.server";
import type { AudioPlayerParams } from "./audioplayer/audioplayerparams";
import EpisodeListing from "./episodeListing";

type NavScreenParams = {
  audioPlayerParams: AudioPlayerParams;
  episodes: ShowListItem[];
};

export default function NavScreen({
  episodes,
  audioPlayerParams,
}: NavScreenParams) {
  const location = useLocation();

  const navRef = useRef<HTMLElement | null>();
  const articleRef = useRef<HTMLElement | null>();

  useEffect(() => {
    navRef.current?.scrollTo({ top: 0 });
  }, [location.search]);

  useEffect(() => {
    articleRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <>
      <nav
        ref={(nav) => (navRef.current = nav)}
        className={`${
          location.pathname !== "/"
            ? "hidden lg:block  mobile-landscape:block "
            : "block"
        } menu-screen overflow-y-auto p-2`}
      >
        <div className="flex flex-col w-full gap-4">
          {episodes.map((x) => (
            <EpisodeListing key={x.link} showListItem={x} />
          ))}
        </div>
      </nav>

      <article
        ref={(article) => (articleRef.current = article)}
        className={`${
          location.pathname !== "/"
            ? "block lg:hidden  mobile-landscape:hidden"
            : "hidden"
        } menu-screen overflow-y-auto p-2 mobile-landscape:pt-2`}
      >
        <Link
          title="Back to episode list"
          to="/"
          className="sticky flex flex-row items-center pt-1 pb-1 pl-1 pr-3 mb-4 -mt-2 -ml-2 text-white border-b-2 border-r-2 border-white rounded-br-lg z-90 -top-2 w-fit bg-slate-500 dark:border-slate-900 dark:bg-slate-300 dark:text-slate-900 lg:hidden mobile-landscape:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          <div className="pl-1 text-sm font-inter">Back</div>
        </Link>

        <div className="flex flex-col w-full gap-2 -z-30">
          <Outlet context={audioPlayerParams} />
        </div>
      </article>
    </>
  );
}
