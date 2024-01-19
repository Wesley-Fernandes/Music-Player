import React from "react";
import style from "./style.module.css";

interface props {
  children: React.ReactNode;
}
export default function Background({ children }: props) {
  return <main className={style.main}>{children}</main>;
}
