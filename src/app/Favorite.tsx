"use client";

import { cn } from "@/lib/utils";
import { Database } from "@/types/supabase";
import { Star } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { favoriteAction } from "./actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FavoriteUnMemo = ({
  bookmark,
}: {
  bookmark: Database["public"]["Tables"]["bookmarks"]["Row"];
}) => {
  const initialState = {
    message: undefined,
    success: undefined,
    data: {
      ...bookmark,
    },
  };

  const [favorite, setFavorite] = useState(bookmark.favorite);
  const [state, formAction] = useFormState(favoriteAction, initialState);

  useEffect(() => {
    if (state.success === true) {
      setFavorite(state.data.favorite);
      console.log("success");
    }
  }, [state]);

  return (
    <TooltipProvider>
      <form action={formAction} key={`bookmark-favorite-form-${bookmark.id}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="submit">
              <Star
                className={cn(
                  "transition",
                  favorite
                    ? "text-yellow-600"
                    : "text-border hover:text-foreground"
                )}
                size={14}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {!favorite ? "Add as favorite" : "Remove as favorite"}
            </p>
          </TooltipContent>
        </Tooltip>
        <input type="hidden" name="id" value={bookmark.id} />
        <input
          name="favorite"
          type="hidden"
          value={favorite.toString()}
          className="opacity-0 absolute"
        />
      </form>
    </TooltipProvider>
  );
};

const Favorite = memo(FavoriteUnMemo);

export { Favorite };
