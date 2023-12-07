"use client";

import { actionInsertBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const BookmarkInsert = () => {
  const initialState = {
    message: undefined,
    success: undefined,
    error: undefined,
    data: {
      url: "",
      title: "",
      description: "",
    },
  };

  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(actionInsertBookmark, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      state.success = undefined;
    }
  }, [state.success]);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button
        type="submit"
        variant={"default"}
        className="flex items-center gap-2"
      >
        {pending && <Loader2Icon className="animate-spin" />}
        Insert bookmark
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>New Bookmark</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <form action={formAction} key="insert-bookmark-form">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Insert new bookmark</h4>
              <p className="text-sm text-muted-foreground">
                Add your favorite websites to your bookmarks.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="url">URL</Label>
                <Input
                  name="url"
                  placeholder="https://google.com"
                  className="col-span-2 h-8"
                  defaultValue={"https://vercel.com"}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="title">Name</Label>
                <Input
                  name="title"
                  placeholder="Name of site"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Input
                  name="description"
                  placeholder="Description of site"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
            <SubmitButton />
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export { BookmarkInsert };
