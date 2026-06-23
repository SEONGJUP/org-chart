import type { Client } from "@notionhq/client";
import { isFullPage } from "@notionhq/client";
import type {
  PageObjectResponse,
  SearchResponse,
  CreatePageParameters,
} from "@notionhq/client/build/src/api-endpoints.js";
import type { NotionMessageData, NotionPageResult, NotionQueryOptions } from "../types/index.js";
import { formatMessageForNotion } from "./messageFormatter.js";
import { logger } from "../utils/logger.js";

export class NotionService {
  constructor(
    private client: Client,
    private databaseId: string,
  ) {}

  async saveMessage(data: NotionMessageData): Promise<string> {
    const payload = formatMessageForNotion(data, this.databaseId);

    const response = await this.client.pages.create(
      payload as CreatePageParameters,
    );
    const page = response as PageObjectResponse;
    logger.info(`노션에 메시지 저장 완료: ${page.id}`);
    return page.id;
  }

  async queryDatabase(options: NotionQueryOptions = {}): Promise<NotionPageResult[]> {
    const { keyword, limit = 10 } = options;

    const response: SearchResponse = await this.client.search({
      query: keyword ?? "",
      filter: { property: "object", value: "page" },
      sort: { timestamp: "last_edited_time", direction: "descending" },
      page_size: limit,
    });

    return response.results
      .filter(isFullPage)
      .filter((page) => {
        // 해당 데이터베이스에 속한 페이지만 필터링
        const parent = page.parent;
        return (
          parent.type === "database_id" &&
          parent.database_id.replace(/-/g, "") === this.databaseId.replace(/-/g, "")
        );
      })
      .map((page) => this.extractPageResult(page));
  }

  async getPage(pageId: string): Promise<NotionPageResult> {
    const response = await this.client.pages.retrieve({ page_id: pageId });
    return this.extractPageResult(response as PageObjectResponse);
  }

  private extractPageResult(page: PageObjectResponse): NotionPageResult {
    const props = page.properties;

    const titleProp = props["Title"];
    const title =
      titleProp?.type === "title"
        ? titleProp.title.map((t) => t.plain_text).join("")
        : "(제목 없음)";

    const authorProp = props["Author"];
    const author =
      authorProp?.type === "rich_text"
        ? authorProp.rich_text.map((t) => t.plain_text).join("")
        : "unknown";

    const channelProp = props["Channel"];
    const channel =
      channelProp?.type === "rich_text"
        ? channelProp.rich_text.map((t) => t.plain_text).join("")
        : "unknown";

    const dateProp = props["Date"];
    const date =
      dateProp?.type === "date" && dateProp.date
        ? dateProp.date.start
        : "unknown";

    return {
      id: page.id,
      title: title.slice(0, 100),
      author,
      channel,
      date,
      url: page.url,
    };
  }
}
