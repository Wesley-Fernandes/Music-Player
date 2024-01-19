import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Playlist {
  name: string;
  author: string;
  thumb: string;
  time: number;
  url: string;
}
interface props {
  player: React.MutableRefObject<HTMLAudioElement | null>;
  playlist: Playlist[];
}
export function Timers({ player, playlist }: props) {
  const [timer, setTimer] = useState(0.0);
  useEffect(() => {
    const updateProgress = () => {
      if (player.current) {
        const currentTime = player.current.currentTime;
        setTimer(currentTime);
        const duration = player.current.duration;
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
        <span>{playlist[music]}</span>
        <span>
          {String(playlist[music].time).replace(".", ":").padStart(5, "0")}
        </span>
      </div>
    </div>
  );
}
