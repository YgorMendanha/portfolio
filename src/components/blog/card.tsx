import { NotionPostFomat } from "@/types/notion";
import { getDictionary } from "@/utils/functions/getDictionary";
import dayjs from "dayjs";
import Link from "next/link";

export const colorMap = {
  red: "bg-red-700",
  pink: "bg-pink-700",
};

export const RenderGrid = ({
  posts,
  lang,
}: {
  posts: NotionPostFomat[];
  lang: "pt" | "en";
}) => {
  const dict = getDictionary(lang ?? "pt");

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        {dict.noPostsFound}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((p) => {
        const date = dayjs(p.date).format("DD-MM-YY");
        return (
          <article
            key={p.id}
            className="group bg-white/5 hover:bg-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg transform-gpu hover:-translate-y-1 transition-all duration-200 border border-gray-800"
          >
            <Link
              href={`/blog/${p.slug}`}
              className="no-underline cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2 text-light-gray group-hover:text-white">
                {p.title || "Sem título"}
              </h3>
              <div className="text-xs text-gray-400 mb-3">{date}</div>

              <p className="text-sm text-gray-300 mb-4">{p.description}</p>

              <div className="flex gap-2 my-2">
                {p.tags.map((tag) => (
                  <div
                    className={`${
                      colorMap[tag.color]
                    } rounded-xl py-1 px-2 bg-opacity-50`}
                    key={tag.name}
                  >
                    <p className="relative">{tag.name}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm mt-auto">
                <span className="text-cyan-light font-medium">
                  {dict.readPost}
                </span>
                <span className="text-light-gray group-hover:text-cyan-light">
                  →
                </span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
};
