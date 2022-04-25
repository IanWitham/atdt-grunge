import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";

import { useOptionalUser } from "~/utils";

import Sign from "~/sign2";
import { getEpisodes, ShowListItem } from "~/models/show.server";
import { json, LoaderFunction } from "@remix-run/server-runtime";
import dayjs from "dayjs";
import lunr from "lunr";
import React, { FormEventHandler, useRef } from "react";

type LoaderData = {
  searchResult: lunr.Index.Result[];
  episodes: ShowListItem[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  //const userId = await requireUserId(request);
  //invariant(params.noteId, "noteId not found");
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
  const location = useLocation();
  const searchInput = useRef<HTMLInputElement>(null);

  const reselectText: FormEventHandler = (x) => {
    searchInput.current?.setSelectionRange(0, searchInput.current.value.length);
  };

  return (
    <main className="flex flex-row max-h-screen min-h-screen bg-gradient-to-t from-slate-300 to-slate-500 dark:from-slate-700 dark:via-slate-900 dark:to-black">
      <menu className="absolute flex flex-row items-center gap-2 top-4 right-4">
        <a title="Find us on Twitter" href="https://twitter.com/drivethrupod">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="text-white opacity-40 hover:opacity-100"
          >
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
        </a>
        <a title="Find us on Facebook" href="https://facebook.com/drivethrupod">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 text-white opacity-40 hover:opacity-100"
            viewBox="0 0 512 512"
          >
            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
          </svg>
        </a>
        <a title="Email us" href="mailto:theegonomistnz@gmail.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white opacity-40 hover:opacity-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </a>
        <a
          title="Subscribe on iTunes"
          href="https://itunes.apple.com/podcast/the-egonomist/id365575555?mt=2&ls=1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white opacity-40 hover:opacity-100"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M224 0C100.3 0 0 100.3 0 224c0 92.22 55.77 171.4 135.4 205.7c-3.48-20.75-6.17-41.59-6.998-58.15C80.08 340.1 48 285.8 48 224c0-97.05 78.95-176 176-176s176 78.95 176 176c0 61.79-32.08 116.1-80.39 147.6c-.834 16.5-3.541 37.37-7.035 58.17C392.2 395.4 448 316.2 448 224C448 100.3 347.7 0 224 0zM224 312c-32.88 0-64 8.625-64 43.75c0 33.13 12.88 104.3 20.62 132.8C185.8 507.6 205.1 512 224 512s38.25-4.375 43.38-23.38C275.1 459.9 288 388.8 288 355.8C288 320.6 256.9 312 224 312zM224 280c30.95 0 56-25.05 56-56S254.1 168 224 168S168 193 168 224S193 280 224 280zM368 224c0-79.53-64.47-144-144-144S80 144.5 80 224c0 44.83 20.92 84.38 53.04 110.8c4.857-12.65 14.13-25.88 32.05-35.04C165.1 299.7 165.4 299.7 165.6 299.7C142.9 282.1 128 254.9 128 224c0-53.02 42.98-96 96-96s96 42.98 96 96c0 30.92-14.87 58.13-37.57 75.68c.1309 .0254 .5078 .0488 .4746 .0742c17.93 9.16 27.19 22.38 32.05 35.04C347.1 308.4 368 268.8 368 224z" />
          </svg>
        </a>
        <a title="RSS" href="http://atthedrivethru.co.nz/rss">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white opacity-40 hover:opacity-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
            <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </a>
        <Link
          className="text-lg text-white font-inter opacity-40 hover:opacity-100"
          to="/about"
        >
          About
        </Link>
      </menu>
      <div className="flex flex-row flex-grow max-h-screen min-h-screen overflow-clip">
        <div
          id="sign-area"
          className="h-screen -mr-8 origin-top-left -translate-x-3 translate-y-8 left-4 -rotate-6"
        >
          <div className="translate-x-[-6.8vh]">
            <Sign />
          </div>
          <div className="neon absolute left-[4vh] top-[15vh] right-0 w-[50vh] -rotate-6 animate-buzz font-neon text-[6vh] text-white">
            <span>At The Drive-Thru</span>
          </div>
          <div className="h-50 absolute top-[26.6vh] left-[7.7vh] h-[65vh] w-[32.44vh] bg-gradient-to-tl from-slate-900 to-slate-700 p-4 shadow-[-10px_-10px_30px_0_rgba(0,0,0,0.5)] dark:from-slate-500 dark:to-slate-400 ">
            <div className="flex flex-col justify-between h-full bg-white dark:bg-slate-800">
              <nav className="flex flex-col w-full gap-8 p-2 overflow-y-auto menu-screen">
                {episodes.map((x) => (
                  <Link
                    to={`/${x.link}${location.search}`}
                    key={x.link}
                    className="text-black "
                  >
                    <div className="pb-1 text-xs font-inter text-slate-800 dark:text-slate-400">
                      {dayjs(x.pubDate).format("D MMMM YYYY")}
                    </div>
                    <div className="text-2xl text-black font-bangers dark:text-slate-200">
                      {x.title.split(":")[0]}
                    </div>
                    <div className="text-xl text-red-600 font-bangers">
                      {x.title.split(":")[1]}
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="relative w-full p-2">
                <Form onSubmit={reselectText}>
                  <input
                    ref={searchInput}
                    onFocus={reselectText}
                    name="search"
                    defaultValue={search ?? ""}
                    placeholder="Search"
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

                <Form className="absolute top-0 bottom-0 right-0 w-5 h-5 my-auto mr-5 text-slate-800 dark:text-slate-200">
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
        <div id="show-notes" className="">
          <article className="relative mt-24 h-[calc(100%-10em)] overflow-y-auto border-4 border-slate-800/50 bg-white/90 p-6 dark:border-slate-100/50 dark:bg-slate-100/20">
            <Outlet />
          </article>
        </div>
      </div>
    </main>
  );
}
