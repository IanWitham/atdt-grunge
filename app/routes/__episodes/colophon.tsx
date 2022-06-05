import { useLoaderData } from "@remix-run/react";
import type {
  LoaderFunction,
  HeadersFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async () => {
  return json({
    headers: {
      "Cache-Control": "public, max-age=604800",
    },
  });
};

export const headers: HeadersFunction = () => {
  return {
    //"Cache-Control": "max-age=300, stale-while-revalidate=1200",
  };
};

export default function About() {
  return (
    <>
      <div className="prose prose-sm prose-slate font-inter dark:prose-invert">
        <h1>Colophon ❦</h1>
        <p>
          <a href="https://github.com/IanWitham/atdt-grunge">This site</a> was
          designed and coded by Ian Witham, @amuletofyendor
        </p>
        <p>
          It was built with the <a href="https://remix.run">Remix</a> framework
          and <a href="https://tailwindcss.com/">Tailwind CSS</a>. It was
          deployed to AWS with the help of{" "}
          <a href="https://arc.codes">Architect</a>.
        </p>
        <p>
          Any wordy parts that you can see but not hear are lovingly typeset in{" "}
          <span className="text-lg">Inter</span>,{" "}
          <span className="font-bangers text-lg">Bangers</span>, and{" "}
          <span className="neon animate-buzz font-neon text-xl">
            Sacramento.
          </span>
        </p>
        <p>
          The fancy light-up sign is an SVG that Ian made, animated with CSS.
          The light bulbs were hand positioned by himself using the finest
          artisanal numbers in a text editor.
        </p>
        <p>
          The colophon was written in the third person, and discreetly placed
          behind a sufficiently printerly-looking unicode icon, U+2766 Floral
          Heart ❦.
        </p>
        <p>
          The Amulet of Yendor is the dungeon's ultimate prize. It is wholly
          distinct from the Talisman of the Raven, which is on Endor.
        </p>
      </div>
    </>
  );
}
