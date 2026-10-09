"use server";

import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function getAudioInfo(youtubeUrl: string) {
  console.log("--> SERVER ACTION RUNNING FOR:", youtubeUrl);

  try {
    // Sanitize and quote the URL
    const cleanUrl = youtubeUrl.trim();

    // Execute yt-dlp to dump JSON info
    const { stdout, stderr } = await execFileAsync("yt-dlp", [
      "-j",
      "--no-warnings",
      "--no-playlist",
      "--extractor-args",
      "youtube:player_client=android,web",
      cleanUrl,
    ]);

    if (stderr) {
      console.warn("--> yt-dlp stderr warning:", stderr);
    }

    const output = JSON.parse(stdout);
    const formats = Array.isArray(output.formats) ? output.formats : [];

    // Filter audio-only formats or best available audio
    const audioFormats = formats.filter(
      (f: any) => f.vcodec === "none" && f.acodec !== "none",
    );

    const selectedFormat =
      audioFormats[0] || formats.find((f: any) => f.acodec !== "none");

    return {
      title: output.title,
      artist: output.uploader,
      thumbnail: output.thumbnail,
      audioUrl: selectedFormat?.url || null,
    };
  } catch (error: any) {
    // This message WILL print to your terminal running `npm run dev`
    console.error("================ SERVER ERROR DETAILED ================");
    console.error("Error Message:", error?.message);
    console.error("Command stderr:", error?.stderr);
    console.error("=======================================================");
    return null;
  }
}
