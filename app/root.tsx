import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from "./utils/theme-provider";
import clsx from "clsx";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=3600",
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/_static/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/_static/favicon-32x32.png",
    },
    { rel: "manifest", href: "/_static/site.webmanifest" },
    {
      rel: "mask-icon",
      href: "/_static/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
    { rel: "shortcut icon", href: "/_static/favicon.ico" },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    // NOTE: Architect deploys the public directory to /_static/
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Bangers&family=Inter&family=Sacramento&family=Space+Mono&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "At the Drive Thru",
  viewport: "width=device-width,initial-scale=1",
  description:
    "At The Drive (formerly known as The Egonomist); your premier source for rants, raves and arguments on topics from Politics to News to Social Trends, with a focus on New Zealand but with an eye to the world. Each week Dan and Dave will bring you new episodes. Sometimes deep and philosophical, sometimes filth and vitriol, we aim to be a voice of informed malcontent.",
  "msapplication-TileColor": "#b91d47",
  "msapplication-config": "/_static/browserconfig.xml",
  "theme-color": "#ffffff",
});

function App() {
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithThemeProvider() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
