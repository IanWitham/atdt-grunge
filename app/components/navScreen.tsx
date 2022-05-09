import { Outlet, useLocation } from "@remix-run/react";
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

  useEffect(() => {
    navRef.current?.scrollTo({ top: 0 });
  }, [location.pathname, location.search]);

  return (
    <nav
      ref={(nav) => (navRef.current = nav)}
      className="p-2 overflow-y-auto menu-screen"
    >
      <div
        className={`${
          location.pathname !== "/"
            ? "flex lg:hidden  mobile-landscape:hidden "
            : "hidden"
        } w-full flex-col gap-2`}
      >
        <Outlet context={audioPlayerParams} />
      </div>
      <div
        className={`${
          location.pathname !== "/"
            ? "hidden lg:flex  mobile-landscape:flex "
            : "flex"
        } w-full flex-col gap-4`}
      >
        {episodes.map((x) => (
          <EpisodeListing key={x.link} showListItem={x} />
        ))}
      </div>
    </nav>
  );
}
