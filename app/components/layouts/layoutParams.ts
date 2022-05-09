import type { ShowListItem } from "~/models/show.server";
import type { AudioPlayerParams } from "../audioplayer/audioplayerparams";

export type LayoutParams = {
    episodes : ShowListItem[];
    search: string | null;
    audioPlayerParams : AudioPlayerParams;
}