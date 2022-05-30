import Marquee from "react-fast-marquee";
import type { AudioPlayerParams } from "./audioplayerparams";
import { formatDuration } from "./utils";

export default function DesktopPlayerControls({
  pause,
  unpause,
  paused,
  nowPlaying,
  reactPlayerRef,
  progress,
  setProgress,
  setSeeking,
  duration,
}: AudioPlayerParams) {
  return (
    <div className="text-xs font-spacemono text-slate-100">
      <div className="flex flex-row gap-2">
        {!paused ? (
          <button
            title="Pause currently playing episode"
            onClick={() => pause()}
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
          <button title="Resume currently playing episode" onClick={unpause}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 transition-opacity duration-500 text-slate-800 hover:opacity-100 dark:text-slate-200"
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

        <input
          // onMouseUp={() => {
          //   setSeeking(true);
          //   setProgress(pro)
          //   //reactPlayerRef.current?.seekTo(progress);
          //   //setSeeking(false);
          // }}
          onChange={(e) => {
            setSeeking(true);
            setProgress(e.target.valueAsNumber);
          }}
          min={0}
          max={duration}
          step={10}
          value={progress}
          title="Episode Progress"
          type="range"
          className="w-full"
        />
      </div>
      <div className="flex-row hidden gap-2 dark:flex">
        <Marquee
          className=""
          gradientWidth={50}
          gradientColor={[30, 41, 59]}
          gradient={false}
        >
          <div className="whitespace-nowrap font-spacemono text-slate-100">
            <span className="px-2">🎙</span>
            <span className="px-2">Now Playing: {nowPlaying?.title}</span>
          </div>
        </Marquee>

        <div className="flex-none text-xs self-middle whitespace-nowrap font-spacemono text-slate-200 dark:text-slate-200 ">
          {formatDuration(progress)} / {formatDuration(duration)}
        </div>
      </div>
      <div className="flex flex-row gap-2 dark:hidden">
        <Marquee
          className=""
          gradientWidth={50}
          gradientColor={[59, 130, 246]}
          gradient={false}
        >
          <div className="whitespace-nowrap font-spacemono text-slate-800">
            <span className="px-2">🎙</span>
            <span className="px-2">Now Playing: {nowPlaying?.title}</span>
          </div>
        </Marquee>

        <div className="flex-none text-xs self-middle whitespace-nowrap font-spacemono text-slate-800 dark:text-slate-800 ">
          {formatDuration(progress)} / {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
}
