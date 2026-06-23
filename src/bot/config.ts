import type { BotConfig } from "./types/index.js";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`환경변수 ${key}가 설정되지 않았습니다.`);
  }
  return value;
}

export function loadConfig(): BotConfig {
  return {
    discord: {
      token: requireEnv("DISCORD_BOT_TOKEN"),
      clientId: requireEnv("DISCORD_CLIENT_ID"),
      guildId: process.env.DISCORD_GUILD_ID ?? "",
      monitoredChannels: (process.env.DISCORD_MONITORED_CHANNELS ?? "")
        .split(",")
        .map((ch) => ch.trim())
        .filter(Boolean),
    },
    notion: {
      apiKey: requireEnv("NOTION_API_KEY"),
      databaseId: requireEnv("NOTION_DATABASE_ID"),
    },
  };
}
