"use server";

import { execFile } from "child_process";
import { promisify } from "util";
import path from "node:path";

const execFileAsync = promisify(execFile);

interface YtDlpFormat {
  vcodec?: string;
  acodec?: string;
  url?: string;
}

interface YtDlpOutput {
  title?: string;
  uploader?: string;
  thumbnail?: string;
  formats?: YtDlpFormat[];
}

const ytDlpPath = path.join(process.cwd(), "bin", "yt-dlp");

export async function getAudioInfo(youtubeUrl: string) {
  try {
    const { stdout, stderr } = await execFileAsync(ytDlpPath, [
      "-j",
      "--no-warnings",
      "--no-playlist",
      "--extractor-args",
      "youtube:player_client=android,web",
      youtubeUrl.trim(),
    ]);

    console.log("yt-dlp version:", stdout.trim());

    if (stderr) {
      console.warn("yt-dlp stderr:", stderr);
    }

    const output: YtDlpOutput = JSON.parse(stdout);
    const formats = output.formats ?? [];

    const audioFormats = formats.filter(
      (format) =>
        format.vcodec === "none" &&
        format.acodec !== undefined &&
        format.acodec !== "none" &&
        Boolean(format.url),
    );

    const selectedFormat =
      audioFormats[0] ??
      formats.find(
        (format) =>
          format.acodec !== undefined &&
          format.acodec !== "none" &&
          Boolean(format.url),
      );

    if (!selectedFormat?.url) {
      console.error("No audio format found", {
        title: output.title,
        formatCount: formats.length,
        audioOnlyFormatCount: audioFormats.length,
      });

      return null;
    }

    return {
      title: output.title ?? "Unknown track",
      artist: output.uploader ?? "Unknown artist",
      thumbnail: output.thumbnail ?? "",
      audioUrl: selectedFormat.url,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Audio extraction failed:", error.message);

      if ("stderr" in error) {
        console.error("yt-dlp stderr:", error.stderr);
      }
    } else {
      console.error("Audio extraction failed:", error);
    }

    return null;
  }
}
