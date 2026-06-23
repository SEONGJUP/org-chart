import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { getCommandsData } from "./index.js";
import { logger } from "../utils/logger.js";

// .env.local 로드
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

async function deployCommands() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!token || !clientId || !guildId) {
    logger.error("DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID 환경변수가 필요합니다.");
    process.exit(1);
  }

  const rest = new REST({ version: "10" }).setToken(token);
  const commands = getCommandsData();

  try {
    logger.info(`${commands.length}개의 슬래시 커맨드를 등록합니다...`);

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    logger.info("슬래시 커맨드 등록 완료!");
  } catch (error) {
    logger.error("슬래시 커맨드 등록 실패:", error);
    process.exit(1);
  }
}

deployCommands();
