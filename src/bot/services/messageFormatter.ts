import type { NotionMessageData } from "../types/index.js";
import type {
  CreatePageParameters,
  BlockObjectRequest,
} from "@notionhq/client/build/src/api-endpoints.js";

type PageProperties = CreatePageParameters["properties"];

export function formatMessageForNotion(
  data: NotionMessageData,
  databaseId: string,
): { parent: { database_id: string }; properties: PageProperties; children: BlockObjectRequest[] } {
  const children: BlockObjectRequest[] = [];

  // 본문
  if (data.content) {
    children.push({
      object: "block" as const,
      type: "paragraph" as const,
      paragraph: {
        rich_text: [
          {
            type: "text" as const,
            text: { content: data.content.slice(0, 2000) },
          },
        ],
      },
    });
  }

  // 첨부파일
  if (data.attachments.length > 0) {
    children.push({
      object: "block" as const,
      type: "paragraph" as const,
      paragraph: {
        rich_text: [
          {
            type: "text" as const,
            text: {
              content: `첨부파일:\n${data.attachments.join("\n")}`,
            },
          },
        ],
      },
    });
  }

  // 원본 링크
  children.push({
    object: "block" as const,
    type: "bookmark" as const,
    bookmark: {
      url: data.messageUrl,
      caption: [
        {
          type: "text" as const,
          text: { content: "Discord 원본 메시지" },
        },
      ],
    },
  });

  return {
    parent: { database_id: databaseId },
    properties: {
      Title: {
        title: [{ text: { content: data.title } }],
      },
      Author: {
        rich_text: [{ text: { content: data.author } }],
      },
      Channel: {
        rich_text: [{ text: { content: data.channel } }],
      },
      Date: {
        date: { start: data.timestamp.toISOString() },
      },
      "Discord Message ID": {
        rich_text: [{ text: { content: data.messageId } }],
      },
    },
    children,
  };
}
