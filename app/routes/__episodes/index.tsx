import { useMatches } from "@remix-run/react";
import type { HeadersFunction } from "@remix-run/server-runtime";
import type lunr from "lunr";
import EpisodeComponent from "~/components/episode";

export const headers: HeadersFunction = () => {
  return {
    //"Cache-Control": "max-age=300, stale-while-revalidate=1200",
  };
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
