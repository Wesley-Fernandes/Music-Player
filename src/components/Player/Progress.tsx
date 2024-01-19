import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { timerRealtime, timerStatic } from "../../utils/timer";

interface Playlist {
  name: string;
  author: string;
  thumb: string;
  time: number;
  url: string;
}
interface props {
  player: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  playlist: Playlist[];
  music: number;
  next: () => void;
}
export default function Progress({
  player,
  isPlaying,
  playlist,
  music,
  next,
}: props) {
  const [played, setPlayed] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (player.current) {
        const currentTime = player.current.currentTime;
        const duration = player.current.duration;
        if (currentTime >= duration) {
          next();
        }
        setPlayed(currentTime);
        setEnd(duration);
      }
    };

    if (isPlaying) {
      const id = setInterval(updateProgress, 1000);
      setIntervalId(id);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };
  }, [player, isPlaying]);

  return (
    <div className={styles.timesContainer}>
      <div className={styles.times}>
        <span>{timerRealtime({ played })}</span>
        <span>{timerStatic({ playlist, music })}</span>
      </div>
      <progress value={played} max={end} className={styles.progress} />
    </div>
  );
}
