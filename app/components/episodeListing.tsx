import { Link, useLocation } from "@remix-run/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { ShowListItem } from "~/models/show.server";

type params = {
  showListItem: ShowListItem;
};

export default function EpisodeListing({ showListItem }: params) {
  const location = useLocation();

  // a little hack to account for the fact that the date on the server is probably different from the
  // date in the browser. If you let the server and desktop renders differ it throws an annoying
  // warning to the console.
  const [pubdate, setPubdate] = useState<string>(
    showListItem.pubDate.split("T")[0]
  );
  useEffect(() => {
    setPubdate(dayjs(showListItem.pubDate).format("D MMMM YYYY"));
  }, [showListItem.pubDate]);

  return (
    <Link
      to={`/${showListItem.link}${location.search}`}
      key={showListItem.link}
      className="text-black "
    >
      <div className="pb-1 text-xs font-inter text-slate-800 dark:text-slate-400">
        {/* {dayjs(showListItem.pubDate).format("D MMMM YYYY")} */}
        {pubdate}
      </div>
      <div className="text-lg text-black font-bangers dark:text-slate-200 sm:text-xl lg:text-2xl">
        {showListItem.title.split(":")[0]}
      </div>
      <div className="text-base text-red-600 font-bangers sm:text-lg md:text-xl">
        {showListItem.title.split(":")[1]}
      </div>
    </Link>
  );
}
