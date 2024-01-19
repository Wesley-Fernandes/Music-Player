import styles from "./styles.module.css"
import { useRef, useState } from "react";
import { Pause } from "@phosphor-icons/react";
import nextSVG from "../../resource/next.svg";
import playSVG from "../../resource/play.svg";
import previusSVG from "../../resource/back.svg";
import Progress from "./Progress";

import { playlist } from "../../db/db";
export default function Player() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [music, setMusic] = useState<number>(0);
  const player = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (player.current) {
      switch (playing) {
        case true:
          setPlaying(false);
          player.current.pause();
          break;
        case false:
          setPlaying(true);
          player.current.play();
          break;
      }
    }
  };

  const next = () => {
    if (player.current != null) {
      switch (music + 1 >= playlist.length) {
        case true:
          player.current.pause();
          setPlaying(false);
          setMusic(0);
          setTimeout(() => {
            if (player.current) {
              player.current.play();
              setPlaying(true);
            }
          }, 1000);
          break;
        case false:
          player.current.pause();
          setPlaying(false);
          setMusic((prev) => prev + 1);
          setTimeout(() => {
            if (player.current) {
              player.current.play();
              setPlaying(true);
            }
          }, 1000);
          break;
      }
    }
  };

  const previus = () => {
    if (player.current != null) {
      switch (music == 0) {
        case true:
          player.current.pause();
          setPlaying(false);
          setMusic(playlist.length - 1);
          setTimeout(() => {
            if (player.current) {
              player.current.play();
              setPlaying(true);
            }
          }, 1000);
          break;
        case false:
          player.current.pause();
          setPlaying(false);
          setMusic((prev) => prev - 1);
          setTimeout(() => {
            if (player.current) {
              player.current.play();
              setPlaying(true);
            }
          }, 1000);
          break;
      }
    }
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <img src={playlist[music].thumb} alt="album-images" />
      </header>
      <main className={styles.main}>
        <h1>{playlist[music].name}</h1>
        <h2>{playlist[music].author}</h2>
      </main>
      <footer className={styles.footer}>
        <Progress
          isPlaying={playing}
          player={player}
          music={music}
          playlist={playlist}
          next={next}
        />
        <div className={styles.actions}>
          <audio
            ref={player}
            src={playlist[music].url}
            controlsList="nodownload"
          />
          <button className={styles.previus} onClick={previus}>
            <img src={previusSVG} alt="previus" />
          </button>
          <button onClick={handlePlay} className={styles.audio}>
            {playing ? (
              <Pause size={18} color="#fff" weight="fill" />
            ) : (
              <img src={playSVG} alt="play" />
            )}
          </button>
          <button onClick={next} className={styles.next}>
            <img src={nextSVG} alt="next" />
          </button>
        </div>
      </footer>
    </section>
  );
}
