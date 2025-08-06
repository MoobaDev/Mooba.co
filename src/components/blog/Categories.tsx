"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Category } from "@/types/Blog";

type CategoriesProps = {
  categories: Category[];
};

export default function Categories({ categories }: CategoriesProps) {
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria") || "todos";

  return (
    <div className="mb-16 flex flex-wrap gap-y-2">
      <Link
        href="/blog"
        className={`border-1 rounded-[100px] px-3 py-[2px] text-sm ${
          categoria === "todos"
            ? "bg-white text-black border-white mr-2 "
            : "text-[#7A7F89] bg-transparent border-[#D0D5DD]"
        }`}
      >
        Todos
      </Link>
      {categories
        .filter((cat) => cat.blogs.length && cat.blogs.length > 0)
        .map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog?categoria=${cat.slug}`}
            className={`border-1 rounded-[100px] px-3 py-[2px] text-sm ${
              categoria === cat.slug
                ? "bg-white text-black border-white mx-2"
                : "text-[#7A7F89] bg-transparent border-[#D0D5DD]"
            } `}
          >
            {cat.name}
          </Link>
        ))}
    </div>
  );
}
