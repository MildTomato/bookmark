import { Button } from "@/components/ui/button";
import { Laptop2, Trash2 } from "lucide-react";
import Image from "next/image";

async function Websites() {
  const websites = [
    {
      id: 1,
      name: "Vercel",
      url: "https://vercel.com",
      description: "Search engine",
    },
    {
      id: 2,
      name: "NextJS",
      url: "https://twitter.com",
      description: "Social media",
    },
    {
      id: 3,
      name: "Supabase",
      url: "https://facebook.com",
      description: "Social media",
    },
    {
      id: 4,
      name: "React",
      url: "https://instagram.com",
      description: "Social media",
    },
    {
      id: 5,
      name: "TailwindCSS",
      url: "https://youtube.com",
      description: "Video sharing",
    },
    {
      id: 6,
      name: "ui.shadcn",
      url: "https://twitch.tv",
      description: "Video streaming",
    },
  ];

  return (
    <div>
      {websites.map((website) => {
        return (
          <li
            key={`${website.id}-${website.name}`}
            className="border-b flex items-center py-2 gap-6 justify-between"
          >
            <div className="flex items-center gap-4">
              <figure className="w-6 h-6 relative bg-black rounded flex items-center justify-center">
                <Laptop2 className="w-4 text-background" />
              </figure>
              <a href={website.url} className="text-sm">
                <span>{website.name}</span>
              </a>
              <a href={website.url} className="font-mono text-sm">
                <span>{website.url}</span>
              </a>

              <p className="text-sm truncate">{website.description}</p>
            </div>
            <Button
              variant={"link"}
              className="text-muted-foreground hover:text-destructive transition"
            >
              <Trash2 className="w-4 " />
            </Button>
          </li>
        );
      })}
    </div>
  );
}

export { Websites };
