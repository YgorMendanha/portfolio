import { getDictionary } from "@/utils/functions/getDictionary";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function BlogNotFoundPage() {
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");

  const path = pathname?.value || "/";
  const lang = path.startsWith("/en") ? "en" : "pt";

  const dict = getDictionary(lang ?? "pt");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">{dict.noPostsFound}</h2>
        <p className="text-gray-300 mb-8">{dict.removedPost}</p>
        <Link href="/blog">
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg">
            {dict.backBlog}
          </button>
        </Link>
      </div>
    </main>
  );
}
