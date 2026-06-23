import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";
import type { NotionService } from "../services/notionService.js";
import { createResultEmbed, createErrorEmbed } from "../utils/embed.js";
import { logger } from "../utils/logger.js";

export const listCommand = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("노션 DB의 최근 항목을 조회합니다")
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("조회할 항목 수 (기본값: 10)")
        .setMinValue(1)
        .setMaxValue(20)
        .setRequired(false),
    ),

  async execute(
    interaction: ChatInputCommandInteraction,
    notionService: NotionService,
  ): Promise<void> {
    await interaction.deferReply();

    const limit = interaction.options.getInteger("count") ?? 10;

    try {
      const results = await notionService.queryDatabase({ limit });
      const embed = createResultEmbed("최근 항목", results);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      logger.error("리스트 커맨드 실패:", error);
      const embed = createErrorEmbed("노션 조회 중 오류가 발생했습니다.");
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
