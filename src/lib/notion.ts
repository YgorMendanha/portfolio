import { NotionBlog, NotionPostFomat, TagsForBlog } from "@/types/notion";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

async function queryAllDataSource({
  dataSourceId,
  tags,
  lang,
}: {
  dataSourceId: string;
  tags?: string | string[];
  lang?: string | string[];
}) {
  const tagPropertyName = "Tags";
  const langPropertyName = "Lang";
  const datePropertyName = "Date";

  const notionAny = notion as any;
  const all: NotionBlog[] = [];
  let cursor: string | undefined = undefined;

  const today = new Date().toISOString().split("T")[0];
  const baseFilter = {
    and: [
      { property: "Published", checkbox: { equals: true } },
      { property: datePropertyName, date: { on_or_before: today } },
    ],
  };

  let tagFilter: any | undefined;
  if (tags) {
    if (Array.isArray(tags)) {
      tagFilter = {
        or: tags.map((t) => ({
          property: tagPropertyName,
          multi_select: { contains: String(t) },
        })),
      };
    } else {
      tagFilter = {
        property: tagPropertyName,
        multi_select: { contains: String(tags) },
      };
    }
  }

  let langFilter: any | undefined;
  if (lang) {
    if (Array.isArray(lang)) {
      langFilter = {
        or: lang.map((l) => ({
          property: langPropertyName,
          select: { equals: String(l) },
        })),
      };
    } else {
      langFilter = {
        property: langPropertyName,
        select: { equals: String(lang) },
      };
    }
  }

  const combinedAnd: any[] = [baseFilter];
  if (tagFilter) combinedAnd.push(tagFilter);
  if (langFilter) combinedAnd.push(langFilter);

  const combinedFilter =
    combinedAnd.length === 1 ? baseFilter : { and: combinedAnd };

  do {
    const res: any = await notionAny.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 50,
      filter: combinedFilter,
    });

    all.push(...(res.results ?? []));
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return all;
}

export async function listPosts({
  tags,
  lang,
}: {
  tags?: string;
  lang?: string;
}): Promise<NotionPostFomat[]> {
  const db: any = await notion.databases.retrieve({
    database_id: process.env.DATABASE_ID!,
  });
  const dataSources = db.data_sources ?? db.dataSources ?? [];
  if (!Array.isArray(dataSources) || dataSources.length === 0) {
    throw new Error(
      "Database não expõe data_sources — verifique a database no Notion"
    );
  }

  const dsId = dataSources[0].id as string;

  const pages = await queryAllDataSource({ dataSourceId: dsId, tags, lang });

  return pages.map((p) => {
    const props = p.properties ?? {};
    const title = props.Title?.rich_text
      ?.map((item) => item.plain_text)
      .join("");
    const slug = props.Slug?.rich_text?.map((item) => item.plain_text).join("");
    const date = props.Date?.date?.start ?? null;
    const tagsProp = props.Tags;
    const tags: Array<TagsForBlog> = [];

    if (tagsProp?.multi_select && tagsProp.multi_select?.length > 0) {
      tagsProp.multi_select?.map((opt) =>
        tags.push({
          name: opt.name ?? "-",
          color: opt.color ?? "red",
        })
      );
    }

    const descriptionProp = props.Description;
    const description: Array<string> = [];

    if (descriptionProp?.rich_text && descriptionProp.rich_text?.length > 0) {
      descriptionProp.rich_text.map((opt) =>
        description.push(opt.text?.content ?? "")
      );
    }

    const published =
      typeof props.Published?.checkbox === "boolean"
        ? props.Published.checkbox
        : false;
    return {
      id: p.id,
      title: String(title),
      slug: String(slug),
      date,
      published,
      tags,
      description,
    };
  });
}

export async function getPostMarkdownBySlug(slug: string, lang?: string) {
  if (!slug) throw new Error("slug é obrigatório");

  const db: any = await notion.databases.retrieve({
    database_id: process.env.DATABASE_ID!,
  } as any);
  const dataSources = db.data_sources ?? [];
  if (!dataSources.length) throw new Error("Database não tem data_sources");
  const dataSourceId = dataSources[0].id;

  const filters: any[] = [{ property: "Slug", rich_text: { equals: slug } }];

  if (lang) {
    filters.push({
      property: "Lang",
      select: { equals: lang },
    });
  }

  const res: any = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: filters.length === 1 ? filters[0] : { and: filters },
  });

  if (!res.results || res.results.length === 0) {
    return;
  }

  const page: NotionBlog = res.results[0];
  const pageId = page.id;

  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdObj = n2m.toMarkdownString(mdBlocks);

  let markdown = "";
  if (typeof mdObj === "string") {
    markdown = mdObj;
  } else if (mdObj && typeof mdObj === "object") {
    if (mdObj.parent && typeof mdObj.parent === "string") {
      markdown += mdObj.parent;
    }
    const children = mdObj.children ?? [];
    if (Array.isArray(children) && children.length > 0) {
      for (const c of children) {
        if (c?.parent && typeof c.parent === "string") {
          markdown += `\n\n---\n\n${c.parent}`;
        }
      }
    }
  }

  const props = page.properties ?? {};
  const title = props.Title?.rich_text?.map((item) => item.plain_text).join("");
  const date = props.Date?.date?.start ?? null;
  const tagsProp = props.Tags;
  const tags: Array<TagsForBlog> = [];

  if (tagsProp?.multi_select && tagsProp.multi_select?.length > 0) {
    tagsProp.multi_select?.map((opt) =>
      tags.push({
        name: opt.name ?? "-",
        color: opt.color ?? "red",
      })
    );
  }

  const descriptionProp = props.Description;
  const description: Array<string> = [];

  if (descriptionProp?.rich_text && descriptionProp.rich_text?.length > 0) {
    descriptionProp.rich_text.map((opt) =>
      description.push(opt.text?.content ?? "")
    );
  }

  return {
    id: pageId,
    slug,
    markdown,
    mdObject: mdObj,
    title,
    date,
    tags,
    description,
    lang,
  };
}
