import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";
import type { NotionService } from "../services/notionService.js";
import { createResultEmbed, createErrorEmbed } from "../utils/embed.js";
import { logger } from "../utils/logger.js";

export const searchCommand = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("노션 DB에서 키워드로 검색합니다")
    .addStringOption((option) =>
      option
        .setName("keyword")
        .setDescription("검색할 키워드")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("limit")
        .setDescription("결과 수 (기본값: 5)")
        .setMinValue(1)
        .setMaxValue(20)
        .setRequired(false),
    ),

  async execute(
    interaction: ChatInputCommandInteraction,
    notionService: NotionService,
  ): Promise<void> {
    await interaction.deferReply();

    const keyword = interaction.options.getString("keyword", true);
    const limit = interaction.options.getInteger("limit") ?? 5;

    try {
      const results = await notionService.queryDatabase({ keyword, limit });
      const embed = createResultEmbed(`"${keyword}" 검색 결과`, results);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      logger.error("검색 커맨드 실패:", error);
      const embed = createErrorEmbed("노션 검색 중 오류가 발생했습니다.");
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
