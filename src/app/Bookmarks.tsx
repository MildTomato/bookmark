import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { BookmarkX, Globe, Star } from "lucide-react";
import { cookies } from "next/headers";

async function Websites() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("inserted_by", { ascending: false });

  return (
    <div>
      {!bookmarks || bookmarks?.length === 0 ? (
        <div> No bookmarks yet </div>
      ) : (
        bookmarks.map((bookmark) => {
          return (
            <li
              key={`${bookmark.id}-${bookmark.title}`}
              className="group border-b last:border-b-0 flex items-center py-2 gap-6 justify-between"
            >
              <div className="flex items-center gap-4">
                <figure className="w-6 h-6 relative bg-black/[2%] group-hover:bg-black/[5%] border border-black/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 text" strokeWidth={1} />
                </figure>

                <a href={bookmark.url} className="font-mono text-sm">
                  <span>{bookmark.url}</span>
                </a>

                <a href={bookmark.url} className="text-sm">
                  <span>{bookmark.title}</span>
                </a>

                <p className="text-sm truncate  text-muted-foreground">
                  {bookmark.description}
                </p>

                {bookmark.favorite && (
                  <Star className="text-yellow-600" size={14} />
                )}
              </div>
              <Button
                variant={"link"}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
              >
                <BookmarkX className="w-4 " />
              </Button>
            </li>
          );
        })
      )}
    </div>
  );
}

export { Websites };
