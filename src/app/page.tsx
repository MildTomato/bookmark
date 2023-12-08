import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Image from "next/image";
import { Websites } from "./Bookmarks";
import { BookmarkInsert } from "./BookmarkInsert";

export default function Home() {
  return (
    <div className="max-w-site px-site mx-auto">
      <Websites />
    </div>
  );
}
