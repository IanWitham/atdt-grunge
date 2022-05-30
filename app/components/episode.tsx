import { useOutletContext } from "@remix-run/react";
import type { Episode } from "podparse";
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import type { AudioPlayerParams } from "./audioplayer/audioplayerparams";

type Params = {
  episode: Episode;
  keywords: string[];
};

const markMatches = (str: string, matchedWords: string[]) =>
  matchedWords && matchedWords.length > 0
    ? str.replace(
        new RegExp(`(${matchedWords.join("|")})`, "gi"),
        "<mark>$1</mark>"
      )
    : str;

export default function EpisodeComponent({ episode, keywords }: Params) {
  const [shareData, setShareDate] = useState<ShareData | undefined>();

  const context = useOutletContext<AudioPlayerParams>();

  useEffect(() => {
    const sd: ShareData = {
      url: episode.link,
      title: "At the Drive True " + episode.title,
      text: episode.summary,
    };
    if (navigator.canShare && navigator.canShare(sd)) {
      setShareDate(sd);
    }
  }, [episode.link, episode.summary, episode.title]);

  return (
    <>
      <h1
        className="text-2xl font-bangers text-slate-900 dark:text-slate-200 lg:text-4xl"
        dangerouslySetInnerHTML={{
          __html: markMatches(episode.title.split(":")[0], keywords),
        }}
      />

      <h2
        className="text-xl text-red-600 font-bangers lg:text-2xl"
        dangerouslySetInnerHTML={{
          __html: markMatches(episode.title.split(":")[1] ?? "", keywords),
        }}
      />
      <ClientOnly
        fallback={<audio src={episode.enclosure.url} preload="none" controls />}
      >
        {() => (
          <div className="flex flex-row gap-4 my-1 lg:my-4">
            {episode.guid === context.nowPlaying?.guid && !context.paused ? (
              <button
                title="Pause this episode"
                onClick={() => context.pause()}
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
                title="Play this episode"
                onClick={() => context.play(episode)}
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

            {shareData && (
              <svg
                onClick={() => navigator.share(shareData)}
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 transition-opacity duration-500 text-slate-900 opacity-60 hover:opacity-100 dark:text-slate-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            )}
          </div>
        )}
      </ClientOnly>
      <div
        className="prose-sm prose prose-slate font-inter dark:prose-invert"
        dangerouslySetInnerHTML={{
          __html: markMatches(episode.description, keywords),
        }}
      />
    </>
  );
}
