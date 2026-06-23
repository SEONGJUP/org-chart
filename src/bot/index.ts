import * as dotenv from "dotenv";
import { resolve } from "path";

// .env.local 로드 (다른 모듈보다 먼저)
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { loadConfig } from "./config.js";
import { createDiscordClient } from "./clients/discord.js";
import { createNotionClient } from "./clients/notion.js";
import { NotionService } from "./services/notionService.js";
import { registerReadyEvent } from "./events/ready.js";
import { registerMessageCreateEvent } from "./events/messageCreate.js";
import { registerCommands } from "./commands/index.js";
import { logger } from "./utils/logger.js";

async function main() {
  try {
    const config = loadConfig();
    logger.info("설정 로드 완료");

    // 클라이언트 생성
    const discordClient = createDiscordClient();
    const notionClient = createNotionClient(config.notion.apiKey);
    const notionService = new NotionService(notionClient, config.notion.databaseId);

    // 이벤트 등록 (모니터링 채널 첫 번째에 시작 알림 전송)
    const notifyChannelId = config.discord.monitoredChannels[0];
    registerReadyEvent(discordClient, notifyChannelId);
    registerMessageCreateEvent(discordClient, notionService, config.discord.monitoredChannels);
    registerCommands(discordClient, notionService);

    // 봇 로그인
    await discordClient.login(config.discord.token);

    // 종료 처리
    const shutdown = () => {
      logger.info("봇을 종료합니다...");
      discordClient.destroy();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("봇 시작 실패:", error);
    process.exit(1);
  }
}

main();
