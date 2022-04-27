
import arc from "@architect/functions";
import type { Episode, Podcast } from "podparse";
import {ungzip} from 'node-gzip';
import lunr from 'lunr';


export type ShowListItem = {
    title: string;
    link: string;
    pubDate:  string;
    subtitle: string;
  }

export async function getEpisodes(search : string) {
    const db = await arc.tables();

    const indexResult = await await db.podcast.get({pk:"searchIndex"});
    const result = await await db.podcast.get({pk: "episodeList"});
    if (indexResult && result) {
        console.log("searching", search);
        const index = lunr.Index.load(JSON.parse((await ungzip(indexResult.body)).toString()));
        const searchResult = index.search(search);
        const episodes = (result.body as ShowListItem[]).filter(x => searchResult.map(y => y.ref).includes(x.link));
        const topResult = episodes.length > 0 ? (await getEpisode(`episode:${episodes[0].link}`)) : undefined
        console.log(searchResult);
        return { searchResult, episodes, topResult };
    }

    return null;
}

export async function getEpisode(id : string) {
    const db = await arc.tables();
    const result = await await db.podcast.get({pk: id});
    if (result) {
        return (result.body as Episode);
    }
    return null;
}
export async function getAbout() {
    const db = await arc.tables();
    const result = await await db.podcast.get({pk: 'feed'});
    if (result) {
        return (result.body as Podcast).meta.description;
    }
    return null;
}