import type { Client, ChatInputCommandInteraction, Interaction } from "discord.js";
import type { NotionService } from "../services/notionService.js";
import { searchCommand } from "./search.js";
import { listCommand } from "./list.js";
import { logger } from "../utils/logger.js";

const commands = [searchCommand, listCommand];

export function getCommandsData() {
  return commands.map((cmd) => cmd.data.toJSON());
}

export function registerCommands(client: Client, notionService: NotionService): void {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const chatInteraction = interaction as ChatInputCommandInteraction;
    const command = commands.find((cmd) => cmd.data.name === chatInteraction.commandName);

    if (!command) {
      logger.warn(`알 수 없는 커맨드: ${chatInteraction.commandName}`);
      return;
    }

    try {
      await command.execute(chatInteraction, notionService);
    } catch (error) {
      logger.error(`커맨드 실행 실패: ${chatInteraction.commandName}`, error);
      const reply = { content: "커맨드 실행 중 오류가 발생했습니다.", ephemeral: true };
      if (chatInteraction.replied || chatInteraction.deferred) {
        await chatInteraction.followUp(reply);
      } else {
        await chatInteraction.reply(reply);
      }
    }
  });

  logger.info(`${commands.length}개의 슬래시 커맨드 핸들러 등록 완료`);
}
