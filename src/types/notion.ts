export interface NotionPostFomat {
  id: string;
  title: string;
  slug: string;
  date: Date | null;
  published: boolean;
  tags: Array<{ name: string; color: ColorFortags }>;
  description: string[];
}

export interface TagsForBlog {
  name: string;
  color: ColorFortags;
}

export type ColorFortags = "red" | "pink";

export interface NotionBlog {
  object?: string;
  id: string;
  created_time?: Date;
  last_edited_time?: Date;
  created_by?: TedBy;
  last_edited_by?: TedBy;
  cover?: null;
  icon?: null;
  parent?: Parent;
  archived?: boolean;
  in_trash?: boolean;
  is_locked?: boolean;
  properties?: Properties;
  url?: string;
  public_url?: null;
}

interface TedBy {
  object?: string;
  id?: string;
}

interface Parent {
  type?: string;
  data_source_id?: string;
  database_id?: string;
}

interface Properties {
  ID?: ID;
  Description?: Description;
  Published?: Published;
  Title?: Description;
  Slug?: Description;
  Date?: DateClass;
  Tags?: Tag;
  Post?: Post;
}

interface DateClass {
  id?: string;
  type?: string;
  date?: DateDate;
}

interface DateDate {
  start?: Date;
  end?: null;
  time_zone?: null;
}

interface Description {
  id?: string;
  type?: string;
  rich_text?: RichText[];
}

interface RichText {
  type?: string;
  text?: Text;
  annotations?: Annotations;
  plain_text?: string;
  href?: null;
}

interface Annotations {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
}

interface Text {
  content?: string;
  link?: null;
}

interface ID {
  id?: string;
  type?: string;
  unique_id?: UniqueID;
}

interface UniqueID {
  prefix?: null;
  number?: number;
}

interface Post {
  id?: string;
  type?: string;
  title?: RichText[];
}

interface Published {
  id?: string;
  type?: string;
  checkbox?: boolean;
}

interface Tag {
  id?: string;
  type?: string;
  multi_select?: MultiSelect[];
}

interface MultiSelect {
  id?: string;
  name?: string;
  color?: ColorFortags;
}
