import { type Client, type TextChannel } from "discord.js";
import { logger } from "../utils/logger.js";

export function registerReadyEvent(client: Client, notifyChannelId?: string): void {
  client.once("ready", async (readyClient) => {
    logger.info(`Bot logged in as ${readyClient.user.tag}`);
    logger.info(`서버 수: ${readyClient.guilds.cache.size}`);
    readyClient.guilds.cache.forEach((guild) => {
      logger.info(`  - ${guild.name} (ID: ${guild.id})`);
    });

    // 시작 알림 메시지 전송
    if (notifyChannelId) {
      try {
        const channel = await readyClient.channels.fetch(notifyChannelId);
        if (channel?.isTextBased()) {
          await (channel as TextChannel).send(
            `✅ **봇이 시작되었습니다!**\n` +
            `> 🤖 ${readyClient.user.tag}\n` +
            `> 📅 ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`
          );
          logger.info("시작 알림 메시지 전송 완료");
        }
      } catch (error) {
        logger.error("시작 알림 메시지 전송 실패:", error);
      }
    }
  });
}
