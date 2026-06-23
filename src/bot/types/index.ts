import type { Message } from "discord.js";

export interface BotConfig {
  discord: {
    token: string;
    clientId: string;
    guildId: string;
    monitoredChannels: string[];
  };
  notion: {
    apiKey: string;
    databaseId: string;
  };
}

export interface NotionMessageData {
  title: string;
  content: string;
  author: string;
  authorId: string;
  channel: string;
  channelId: string;
  messageId: string;
  messageUrl: string;
  timestamp: Date;
  attachments: string[];
}

export interface NotionPageResult {
  id: string;
  title: string;
  author: string;
  channel: string;
  date: string;
  url: string;
}

export interface NotionQueryOptions {
  keyword?: string;
  limit?: number;
}

export function extractMessageData(message: Message): NotionMessageData {
  return {
    title: message.content.slice(0, 100) || "(첨부파일)",
    content: message.content,
    author: message.author.tag,
    authorId: message.author.id,
    channel: (message.channel as { name?: string }).name ?? "unknown",
    channelId: message.channelId,
    messageId: message.id,
    messageUrl: message.url,
    timestamp: message.createdAt,
    attachments: message.attachments.map((a) => a.url),
  };
}
