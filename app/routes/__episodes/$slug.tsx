import { useLoaderData, useMatches, useParams } from "@remix-run/react";
import EpisodeComponent from "../../components/episode";
import {
  LoaderFunction,
  json,
  HeadersFunction,
} from "@remix-run/server-runtime";
import { Episode } from "podparse";

import { getEpisode } from "~/models/show.server";

export const loader: LoaderFunction = async ({ params }) => {
  const episode = await getEpisode(`episode:${params.slug}`);
  if (!episode) {
    throw new Response("Not Found", { status: 404 });
  } else {
    return json({ episode: episode });
  }
};

export const headers: HeadersFunction = () => {
  return {
    //"Cache-Control": "max-age=300, stale-while-revalidate=1200",
  };
};

type LoaderDataType = {
  episode: Episode;
};

export default function EpisodeDetailComponent() {
  const { episode } = useLoaderData<LoaderDataType>();

  const matches = useMatches();
  const routeData = matches[1].data;
  const { searchResult } = routeData;
  const params = useParams();

  const sr =
    (searchResult as lunr.Index.Result[]).find(
      (x) => x.ref === (params.slug ?? "")
    ) ?? undefined;
  const keywords = sr?.matchData.metadata
    ? Object.keys(sr.matchData.metadata)
    : [];

  return <EpisodeComponent keywords={keywords} episode={episode} />;
}
