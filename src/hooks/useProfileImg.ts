import { useEffect, useState } from "react";
import {
  Letter,
  LetterProfileInfo,
  ProfileColorPalette,
} from "../utils/types/ProfileColorPallete";

const colorPalette: ProfileColorPalette[] = [
  { bg: "#ffb703", txt: "#000814" }, // text darkgray // 0
  { bg: "#023047", txt: "#f1faee" }, // text white // 1
  { bg: "#e63946", txt: "#f1faee" }, // 2
  { bg: "#fb8500", txt: "#f1faee" }, // 3
  { bg: "#e09f3e", txt: "#000814" }, // 4
  { bg: "#ff7f51", txt: "#f1faee" }, // 5
  { bg: "#f72585", txt: "#f1faee" }, // 6
];

const paletteForAlphabet: { [key in Letter]: ProfileColorPalette } = {
  a: colorPalette[0],
  b: colorPalette[1],
  c: colorPalette[2],
  d: colorPalette[3],
  e: colorPalette[4],
  f: colorPalette[5],
  g: colorPalette[6],
  h: colorPalette[0],
  i: colorPalette[1],
  j: colorPalette[2],
  k: colorPalette[3],
  l: colorPalette[4],
  m: colorPalette[5],
  n: colorPalette[6],
  o: colorPalette[0],
  p: colorPalette[1],
  q: colorPalette[2],
  r: colorPalette[3],
  s: colorPalette[4],
  t: colorPalette[5],
  u: colorPalette[6],
  v: colorPalette[0],
  w: colorPalette[1],
  x: colorPalette[2],
  y: colorPalette[3],
  z: colorPalette[4],
  "": colorPalette[0],
};

/**
 * Custom hook that assigns a profile picture URL or first letter to a user based on the input provided.
 *
 * @param url A string representing the URL to the user's profile picture.
 * @param props An optional object containing two properties: `letter` and `name`. `letter` is a string representing the user's initial letter, and `name` is an array of strings containing the user's name.
 *
 * @returns An object with three properties:
 * - pictureUrl: a string representing the URL to the user's profile picture.
 * - firstLetter: an object containing a `letter` property representing the user's initial letter, and a `palette` property representing the color palette for the letter.
 * - assignPicture: a function that assigns a profile picture URL or first letter to the user based on the input provided.
 */
const useProfileImg = (
  url?: string,
  props?: { letter?: Letter; name?: Letter[] }
) => {
  const [pictureUrl, setPictureUrl] = useState("");
  const [firstLetter, setFirstLetter] = useState<
    LetterProfileInfo<ProfileColorPalette>
  >({
    letter: "",
    palette: { bg: "", txt: "" },
  });

  const assignPicture = (
    url?: string,
    props?: { letter?: Letter; name?: Letter[] }
  ) => {
    if (url) return url;
    else if (props?.letter) return props?.letter;
    else if (props?.name) return props?.name[0];
  };

  useEffect(() => {
    if (url) setPictureUrl(url);
    else if (props?.letter)
      setFirstLetter({
        letter: props?.letter,
        palette: paletteForAlphabet[props?.letter],
      });
    else if (props?.name)
      setFirstLetter({
        letter: props?.name[0],
        palette: paletteForAlphabet[props?.name[0]],
      });
  }, [props?.letter, props?.name, url]);

  return { pictureUrl, firstLetter, assignPicture };
};

export default useProfileImg;
