import { atom } from "jotai";

export const todoAtom = atom(
  window.localStorage.getItem("todo")
    ? JSON.parse(window.localStorage.getItem("todo") as string)
    : []
);
