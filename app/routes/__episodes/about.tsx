import { useLoaderData } from "@remix-run/react";
import {
  LoaderFunction,
  json,
  HeadersFunction,
} from "@remix-run/server-runtime";
import { getAbout } from "~/models/show.server";

export const loader: LoaderFunction = async () => {
  const about = await getAbout();
  if (!about) {
    throw new Response("Not Found", { status: 404 });
  } else {
    return json({ about: about });
  }
};

type LoaderDataType = {
  about: string;
};

export const headers: HeadersFunction = () => {
  return {
    //"Cache-Control": "max-age=300, stale-while-revalidate=1200",
  };
};

export default function About() {
  const { about } = useLoaderData<LoaderDataType>();

  return (
    <>
      {/* <pre>** {JSON.stringify(about, null, 2)} **</pre> */}
      <div
        className="prose-sm prose prose-slate font-inter dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: about.replace("\n", "</br></br>") }}
      />
    </>
  );
}
