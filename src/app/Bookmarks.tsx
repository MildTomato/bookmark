import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { Globe, Search, Star } from "lucide-react";
import { cookies } from "next/headers";
import { BookmarkDelete } from "./BookmarkDelete";
import { BookmarkInsert } from "./BookmarkInsert";

async function Websites() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("inserted_by", { ascending: false });

  if (!userData.user) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center border border-dashed py-32 rounded-md">
        <h1 className="text-sm">You are not signed in</h1>
        <a href="/signin">
          <Button type="button" size={"sm"}>
            Sign in
          </Button>
        </a>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-row gap-3 w-full items-center">
        <Label className="relative grow">
          <Search className="absolute left-4 top-2 w-4" />
          <Input
            name="url"
            placeholder="Search for a website"
            type="url"
            className="pl-12"
          />
        </Label>
        <div className="h-[2rem] w-px bg-border"></div>
        <BookmarkInsert />
      </div>
      <div className="py-4"></div>
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
              <BookmarkDelete bookmark={bookmark} />
            </li>
          );
        })
      )}
    </div>
  );
}

export { Websites };
