import { EmbedBuilder } from "discord.js";
import type { NotionPageResult } from "../types/index.js";

const BRAND_COLOR = 0x5865f2; // Discord blurple

export function createResultEmbed(title: string, results: NotionPageResult[]): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setColor(BRAND_COLOR)
    .setTimestamp();

  if (results.length === 0) {
    embed.setDescription("검색 결과가 없습니다.");
    return embed;
  }

  const description = results
    .map((r, i) => {
      const date = r.date !== "unknown" ? r.date.slice(0, 10) : "날짜 없음";
      return `**${i + 1}.** [${r.title}](${r.url})\n> ${r.author} · #${r.channel} · ${date}`;
    })
    .join("\n\n");

  embed.setDescription(description);
  embed.setFooter({ text: `${results.length}건의 결과` });

  return embed;
}

export function createErrorEmbed(message: string): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle("오류")
    .setDescription(message)
    .setColor(0xed4245)
    .setTimestamp();
}
