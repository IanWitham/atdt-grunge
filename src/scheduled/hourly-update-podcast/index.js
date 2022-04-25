const axios = require("axios").default;
const arc = require("@architect/functions");
const lunr = require("lunr");
const convert = require("html-to-text");
const podparse = require("podparse");
const { gzip } = require("node-gzip");

const getSlug = (link) => link.split("/").pop();

exports.handler = async function scheduled(event) {
  console.log("running the scheduled task...");
  console.log(JSON.stringify(event, null, 2));

  const db = await arc.tables();

  // get the previous data to check the last datetime updated
  const lastData = await db.podcast.get({ pk: "feed" });

  const { data } = await axios.get("http://atthedrivethru.co.nz/rss");
  const podcast = podparse(data);

  if (
    lastData !== undefined &&
    lastData.body.meta.pubDate === podcast.meta.pubDate
  ) {
    console.log("pubDate matches the current pubDate... no change");
    return;
  }

  await db.podcast.put({ pk: "feed", body: podcast });

  // save full episode detail views as their own items
  podcast.episodes.forEach(async (episode) => {
    await db.podcast.put({
      pk: `episode:${getSlug(episode.link)}`,
      body: episode,
    });
  });

  // save the episode list view as one item
  const episodeList = podcast.episodes.map((episode) => ({
    title: episode.title,
    link: episode.link.split("/").slice(-1).pop(),
    pubDate: episode.pubDate,
    subtitle: episode.subtitle,
  }));
  await db.podcast.put({ pk: "episodeList", body: episodeList });

  // build a lunr index
  const index = lunr((config) => {
    config.ref("slug");
    config.field("title");
    config.field("description");
    podcast.episodes.forEach((x) => {
      const item = {
        slug: getSlug(x.link),
        title: x.title,
        description: convert.htmlToText(x.description),
      };
      config.add(item);
    });
  });

  const compressedIndex = await gzip(JSON.stringify(index.toJSON()));

  await db.podcast.put({ pk: "searchIndex", body: compressedIndex });

  console.log("Records updated");

  return;
};
