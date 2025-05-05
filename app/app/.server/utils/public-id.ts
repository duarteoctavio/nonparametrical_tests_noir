import { customAlphabet } from "nanoid";

const PUBLIC_ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(PUBLIC_ID_ALPHABET, 12);

export function generatePublicId() {
  return nanoid();
}
