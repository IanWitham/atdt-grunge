import { Link, useLocation } from "@remix-run/react";
import dayjs from "dayjs";
import type { ShowListItem } from "~/models/show.server";

type params = {
  showListItem: ShowListItem;
};

export default function EpisodeListing({ showListItem }: params) {
  const location = useLocation();

  return (
    <Link
      to={`/${showListItem.link}${location.search}`}
      key={showListItem.link}
      className="text-black "
    >
      <div className="pb-1 text-xs font-inter text-slate-800 dark:text-slate-400">
        {dayjs(showListItem.pubDate).format("D MMMM YYYY")}
      </div>
      <div className="text-2xl text-black font-bangers dark:text-slate-200">
        {showListItem.title.split(":")[0]}
      </div>
      <div className="text-xl text-red-600 font-bangers">
        {showListItem.title.split(":")[1]}
      </div>
    </Link>
  );
}
