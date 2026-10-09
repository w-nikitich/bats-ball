// import { loadEnvConfig } from "@next/env";

// const projectDir = process.cwd();
// loadEnvConfig(projectDir);

export const serverEnv = {
  youtubeApi: process.env.YOUTUBE_API,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  playlistId: process.env.PLAYLIST_ID,
  audiusApiKey: process.env.AUDIUS_API_KEY,
  databaseUrl: process.env.DATABASE_URL
};

export const clientEnv = {
  youtubeApi: process.env.NEXT_PUBLIC_YOUTUBE_API,
};
