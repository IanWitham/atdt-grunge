import { Link } from "@remix-run/react";
import { Theme, useTheme } from "~/utils/theme-provider";

export default function Menu() {
  const [, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <menu className="flex flex-row items-center gap-2 ">
      <button
        className="relative w-4 h-4 group sm:h-5 sm:w-5"
        title="Toggle theme"
        onClick={toggleTheme}
      >
        {/* sun */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-4 h-4 transition-opacity duration-500 opacity-0 text-slate-900 dark:text-white dark:opacity-60 dark:group-hover:opacity-100 sm:h-5 sm:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
        {/* moon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-4 h-4 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-white dark:opacity-0 hover:dark:opacity-0 sm:h-5 sm:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
      <a title="Find us on Twitter" href="https://twitter.com/drivethrupod">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-white"
        >
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      </a>
      <a title="Find us on Facebook" href="https://facebook.com/drivethrupod">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-4 h-4 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-white sm:h-5 sm:w-5"
          viewBox="0 0 512 512"
        >
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
        </svg>
      </a>
      <a title="Email us" href="mailto:theegonomistnz@gmail.com">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-white sm:h-5 sm:w-5"
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
          className="w-4 h-4 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-white sm:h-5 sm:w-5"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M224 0C100.3 0 0 100.3 0 224c0 92.22 55.77 171.4 135.4 205.7c-3.48-20.75-6.17-41.59-6.998-58.15C80.08 340.1 48 285.8 48 224c0-97.05 78.95-176 176-176s176 78.95 176 176c0 61.79-32.08 116.1-80.39 147.6c-.834 16.5-3.541 37.37-7.035 58.17C392.2 395.4 448 316.2 448 224C448 100.3 347.7 0 224 0zM224 312c-32.88 0-64 8.625-64 43.75c0 33.13 12.88 104.3 20.62 132.8C185.8 507.6 205.1 512 224 512s38.25-4.375 43.38-23.38C275.1 459.9 288 388.8 288 355.8C288 320.6 256.9 312 224 312zM224 280c30.95 0 56-25.05 56-56S254.1 168 224 168S168 193 168 224S193 280 224 280zM368 224c0-79.53-64.47-144-144-144S80 144.5 80 224c0 44.83 20.92 84.38 53.04 110.8c4.857-12.65 14.13-25.88 32.05-35.04C165.1 299.7 165.4 299.7 165.6 299.7C142.9 282.1 128 254.9 128 224c0-53.02 42.98-96 96-96s96 42.98 96 96c0 30.92-14.87 58.13-37.57 75.68c.1309 .0254 .5078 .0488 .4746 .0742c17.93 9.16 27.19 22.38 32.05 35.04C347.1 308.4 368 268.8 368 224z" />
        </svg>
      </a>
      <a title="RSS" href="http://atthedrivethru.co.nz/rss">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-white sm:h-5 sm:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
          <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
        </svg>
      </a>
      <Link
        className="text-sm transition-opacity duration-500 font-inter text-slate-900 opacity-60 hover:opacity-100 dark:text-white"
        to="/about"
      >
        About
      </Link>
    </menu>
  );
}
