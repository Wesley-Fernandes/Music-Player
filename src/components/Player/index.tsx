import { useRef, useState } from "react";
import styles from "./styles.module.css";
import { Pause, Play, SkipBack, SkipForward } from "@phosphor-icons/react";
import { playlist } from "../../db/db";
import Progress from "./Progress";
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

  console.log(music);
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
          <audio ref={player} src={playlist[music].url} />
          <button className={styles.previus} onClick={previus}>
            <SkipBack size={15} color="#4D5562" weight="fill" />
          </button>
          <button onClick={handlePlay} className={styles.audio}>
            {playing ? (
              <Pause size={18} color="#fff" weight="fill" />
            ) : (
              <Play size={18} color="#fff" weight="fill" />
            )}
          </button>
          <button onClick={next} className={styles.next}>
            <SkipForward size={15} color="#4D5562" weight="fill" />
          </button>
        </div>
      </footer>
    </section>
  );
}
