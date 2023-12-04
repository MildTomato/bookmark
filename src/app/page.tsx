import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Image from "next/image";
import { Websites } from "./websites";

export default function Home() {
  return (
    <div className="max-w-site px-site mx-auto">
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
        <form className="flex flex-row gap-2 shrink">
          {/* <Label>
            <Input
              name="url"
              placeholder="Add a new website address"
              type="url"
            />
          </Label> */}
          <Button variant={"outline"}>New Bookmark</Button>
        </form>
      </div>
      <div className="py-4">
        <Websites />
      </div>
    </div>
  );
}
