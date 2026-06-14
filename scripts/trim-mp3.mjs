// Lossless MP3 trimmer — copies only the audio frames within [START, END]
// seconds, no re-encode, no dependencies. Used to shrink the BGM to just the
// looped section so it loads fast and starts instantly.
//
//   node scripts/trim-mp3.mjs <in> <out> <startSec> <endSec> [--probe]
import { readFileSync, writeFileSync } from "node:fs";

const [, , inPath, outPath, startStr, endStr, flag] = process.argv;
const START = Number(startStr);
const END = Number(endStr);
const PROBE = flag === "--probe";

const buf = readFileSync(inPath);

// MPEG audio tables
const BITRATES = {
  // [version][layer] -> array indexed by bitrate index (0 & 15 invalid)
  1: {
    1: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 0],
    2: [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 0],
    3: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0],
  },
  2: {
    1: [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 0],
    2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0],
    3: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0],
  },
};
const SAMPLE_RATES = {
  1: [44100, 48000, 32000, 0], // MPEG1
  2: [22050, 24000, 16000, 0], // MPEG2
  2.5: [11025, 12000, 8000, 0], // MPEG2.5
};

// skip an ID3v2 tag if present
let pos = 0;
if (buf.slice(0, 3).toString("latin1") === "ID3") {
  const size =
    (buf[6] << 21) | (buf[7] << 14) | (buf[8] << 7) | buf[9]; // syncsafe
  pos = 10 + size;
}

const frames = []; // { offset, length } within [START, END]
let time = 0;
let probed = null;

while (pos + 4 <= buf.length) {
  // find frame sync
  if (buf[pos] !== 0xff || (buf[pos + 1] & 0xe0) !== 0xe0) {
    pos++;
    continue;
  }
  const verBits = (buf[pos + 1] >> 3) & 0x3;
  const layerBits = (buf[pos + 1] >> 1) & 0x3;
  if (verBits === 1 || layerBits === 0) {
    pos++;
    continue;
  }
  const version = verBits === 3 ? 1 : verBits === 2 ? 2 : 2.5;
  const layer = layerBits === 3 ? 1 : layerBits === 2 ? 2 : 3;
  const brIndex = (buf[pos + 2] >> 4) & 0xf;
  const srIndex = (buf[pos + 2] >> 2) & 0x3;
  const padding = (buf[pos + 2] >> 1) & 0x1;
  const verKey = version === 1 ? 1 : 2; // MPEG2 & 2.5 share bitrate table
  const bitrate = BITRATES[verKey]?.[layer]?.[brIndex];
  const sampleRate = SAMPLE_RATES[version]?.[srIndex];
  if (!bitrate || !sampleRate) {
    pos++;
    continue;
  }
  const samplesPerFrame = layer === 1 ? 384 : version === 1 ? 1152 : 576;
  const frameLen =
    Math.floor((samplesPerFrame / 8) * (bitrate * 1000) / sampleRate) +
    (layer === 1 ? padding * 4 : padding);
  if (frameLen < 4) {
    pos++;
    continue;
  }
  if (!probed) {
    probed = { version, layer, bitrate, sampleRate, samplesPerFrame };
  }
  const frameDur = samplesPerFrame / sampleRate;
  if (time >= START && time < END) {
    frames.push({ offset: pos, length: frameLen });
  }
  time += frameDur;
  pos += frameLen;
  if (time >= END) break;
}

console.log("probe:", JSON.stringify(probed));
console.log("total duration scanned (s):", time.toFixed(2));
console.log("frames in range:", frames.length);

if (PROBE) process.exit(0);

if (frames.length === 0) {
  console.error("No frames found in range — aborting.");
  process.exit(1);
}

const start = frames[0].offset;
const last = frames[frames.length - 1];
const out = buf.subarray(start, last.offset + last.length);
writeFileSync(outPath, out);
const clipDur = frames.length * (probed.samplesPerFrame / probed.sampleRate);
console.log(
  `wrote ${outPath}: ${(out.length / 1024).toFixed(0)} KB, ~${clipDur.toFixed(2)} s`,
);
