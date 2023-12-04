import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function Navigation() {
  return (
    <nav role="navigation" className="border-b">
      <div className="max-w-site mx-auto py-2 flex gap-3 items-center px-site">
        <figure role="img" aria-label="Logo" className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6"
            viewBox="0 0 70 75"
            fill="none"
          >
            <path d="M0.5 73H70" stroke="black" strokeWidth="4" />
            <path d="M0.5 12.9583H70" stroke="black" strokeWidth="4" />
            <path d="M0.5 2.69263H70" stroke="black" strokeWidth="4" />
            <path d="M0.5 24.9167H70" stroke="black" strokeWidth="4" />
            <path d="M0.5 36.875H54" stroke="black" strokeWidth="4" />
            <path d="M0.5 48.375H70" stroke="black" strokeWidth="4" />
            <path d="M0.5 61.875H70" stroke="black" strokeWidth="4" />
          </svg>
        </figure>
        <ul role="menubar" className="flex items-center gap-2 grow">
          <li role="menuitem">
            <Button asChild variant={"ghost"}>
              <Link href="/">Bookmark</Link>
            </Button>
          </li>
          <li role="menuitem">
            <Button asChild variant={"ghost"}>
              <Link href="/about">About</Link>
            </Button>
          </li>
        </ul>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-8 h-8 bg-black rounded-full"
              area-aria-label="open user dropdown"
            ></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export { Navigation };
