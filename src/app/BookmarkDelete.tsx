"use client";

import { actionDeleteBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/types/supabase";
import { BookmarkX, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const BookmarkDelete = ({
  bookmark,
}: {
  bookmark: Database["public"]["Tables"]["bookmarks"]["Row"];
}) => {
  const initialState = {
    message: undefined,
    success: undefined,
    error: undefined,
    data: {
      id: "",
    },
  };

  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(actionDeleteBookmark, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button
        variant={"link"}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
      >
        {pending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <BookmarkX className="w-4 " />
        )}
      </Button>
    );
  }

  return (
    <form action={formAction} key="insert-bookmark-form">
      <Input name="id" type="hidden" value={bookmark.id} />
      <SubmitButton />
    </form>
  );
};

export { BookmarkDelete };
