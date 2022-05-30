import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import { cacheAssets } from "remix-utils";

cacheAssets({ buildPath: "public/build" }).catch((error) => {
  console.log("Error caching JS assets", error);
});

hydrate(<RemixBrowser />, document);
