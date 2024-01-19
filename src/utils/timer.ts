interface Realtime {
  played: number;
}

interface Playlist {
  name: string;
  author: string;
  thumb: string;
  time: number;
  url: string;
}
interface Static {
  playlist: Playlist[];
  music: number;
}
export function timerRealtime({ played }: Realtime) {
  const minutes = Math.round(played);
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  const hoursF = hours.toString().padStart(2, "0");
  const minutesF = minutesLeft.toString().padStart(2, "0");
  return `${hoursF}:${minutesF}`;
}

export function timerStatic({ playlist, music }: Static) {
  const result = String(playlist[music].time)
    .replace(".", ":")
    .padStart(5, "0");

  return result;
}
