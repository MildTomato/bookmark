import { Button } from "@/components/ui/button";
import { Laptop2, Trash2 } from "lucide-react";
import Image from "next/image";

async function Websites() {
  const websites = [
    {
      id: 1,
      name: "Google",
      url: "https://google.com",
      description: "Search engine",
    },
    {
      id: 2,
      name: "Twitter",
      url: "https://twitter.com",
      description: "Social media",
    },
    {
      id: 3,
      name: "Facebook",
      url: "https://facebook.com",
      description: "Social media",
    },
    {
      id: 4,
      name: "Instagram",
      url: "https://instagram.com",
      description: "Social media",
    },
    {
      id: 5,
      name: "YouTube",
      url: "https://youtube.com",
      description: "Video sharing",
    },
    {
      id: 6,
      name: "Twitch",
      url: "https://twitch.tv",
      description: "Video streaming",
    },
    {
      id: 7,
      name: "Reddit",
      url: "https://reddit.com",
      description: "Social news aggregation",
    },
    {
      id: 8,
      name: "GitHub",
      url: "https://github.com",
      description: "Code hosting",
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
