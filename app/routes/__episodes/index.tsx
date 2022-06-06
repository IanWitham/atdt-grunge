import { useMatches } from "@remix-run/react";
import type lunr from "lunr";
import EpisodeComponent from "~/components/episode";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async () => {
  return json({
    headers: {
      "Cache-Control": "public, max-age=1200",
    },
  });
};

export default function Index() {
  const matches = useMatches();
  const routeData = matches[1].data;
  const { topResult, searchResult } = routeData;
  const keywords = topResult
    ? Object.keys((searchResult as lunr.Index.Result[])[0].matchData.metadata)
    : [];

  return topResult ? (
    <EpisodeComponent keywords={keywords} episode={topResult} />
  ) : (
    <div>No results.</div>
  );
}
