import { Form, Link, useLocation } from "@remix-run/react";
import type { FormEventHandler } from "react";
import { useRef } from "react";
import Menu from "../menu";
import NavScreen from "../navScreen";
import type { LayoutParams } from "./layoutParams";

export default function SmallMobileLayout({
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
    <>
      <div className="fixed inset-0 h-screen bg-redwall bg-cover px-4 pt-[44vw] pb-4">
        <div className="h-full w-full bg-gradient-to-tl from-slate-500 to-slate-400 p-2  shadow-[-5px_-5px_15px_0_rgba(0,0,0,0.5)] dark:from-slate-500 dark:to-slate-400">
          <div className="flex flex-col justify-between h-full bg-white dark:bg-slate-800">
            <NavScreen
              audioPlayerParams={audioPlayerParams}
              episodes={episodes}
            />
            <div
              className={`relative w-full p-2 ${
                location.pathname === "/" ? "block" : "hidden"
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
            </div>
          </div>
        </div>
      </div>
      <div className="neon fixed top-[22vw] left-0 right-0 -rotate-6 animate-buzz text-center font-neon text-white">
        {/* screen */}
        <Link to="/" className="text-[12vw] ">
          At The Drive-Thru
        </Link>
      </div>
      <div className="fixed left-0 right-auto p-2 pl-4 rounded-l-none rounded-r-full z-60 top-2 bg-white/50 backdrop-blur-sm dark:bg-slate-900/20">
        <Menu />
      </div>
    </>
  );
}
