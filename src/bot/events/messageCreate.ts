import type { Client } from "discord.js";
import type { NotionService } from "../services/notionService.js";
import { extractMessageData } from "../types/index.js";
import { logger } from "../utils/logger.js";

export function registerMessageCreateEvent(
  client: Client,
  notionService: NotionService,
  monitoredChannels: string[],
): void {
  client.on("messageCreate", async (message) => {
    // 봇 메시지 무시
    if (message.author.bot) return;

    // 모니터링 채널이 설정된 경우 해당 채널만 처리
    if (monitoredChannels.length > 0 && !monitoredChannels.includes(message.channelId)) {
      return;
    }

    try {
      const data = extractMessageData(message);
      await notionService.saveMessage(data);
      logger.debug(`메시지 저장 완료: ${message.id} (채널: ${data.channel})`);
    } catch (error) {
      logger.error(`메시지 저장 실패: ${message.id}`, error);
    }
  });
}
