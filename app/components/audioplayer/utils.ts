const secondsPart = (seconds : number) => Math.floor(seconds % 60);
const minutesPart = (seconds : number) => Math.floor((seconds / 60) % 60);
const hoursPart = (seconds : number) => Math.floor((seconds / 3600)) 

const getParts = (seconds : number) => (
     {
    s : secondsPart(seconds),
    m : minutesPart(seconds),
    h : hoursPart(seconds)
});

export function formatDuration(durationInSeconds : number) {
    const parts = getParts(durationInSeconds);
    const h = parts.h.toString();
    const m = parts.m.toString().padStart(2, '0');
    const s = parts.s.toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

