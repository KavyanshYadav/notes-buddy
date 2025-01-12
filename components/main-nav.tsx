"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Notebook } from "lucide-react";
import Image from "next/image";

export function MainNav() {
  const notes: { title: string; href: string; description?: string }[] = [
    {
      title: "View Notes",
      href: "/notes",
      description: "Click here to view all notes.",
    },
    {
      title: "First Year Notes",
      href: "/tags/1st-Year",
      description: "Click here to view notes for the first Year.",
    },
    {
      title: "Second Year Notes",
      href: "/tags/2nd-Year",
      description: "Click here to view notes for the second Year.",
    },
    {
      title: "Third Year Notes",
      href: "/tags/3rd-Year",
      description: "Click here to view notes for the third Year.",
    },
    {
      title: "Fourth Year Notes",
      href: "/tags/4th-Year",
      description: "Click here to view notes for the fourth Year.",
    },
    {
      title: "Semester 1",
      href: "/tags/1st-Semester",
      description: "Click here to view notes for 1st Semester subjects.",
    },
    {
      title: "Semester 2",
      href: "/tags/2nd-Semester",
      description: "Click here to view notes for 2nd Semester subjects.",
    },
    {
      title: "Semester 3",
      href: "/tags/3rd-Semester",
      description: "Click here to view notes for 3rd Semester subjects.",
    },
    {
      title: "Semester 4",
      href: "/tags/4th-Semester",
      description: "Click here to view notes for 4th Semester subjects.",
    },
    {
      title: "Semester 5",
      href: "/tags/5th-Semester",
      description: "Click here to view notes for 5th Semester subjects.",
    },
    {
      title: "Semester 6",
      href: "/tags/6th-Semester",
      description: "Click here to view notes for 6th Semester subjects.",
    },
    {
      title: "Semester 7",
      href: "/tags/7th-Semester",
      description: "Click here to view notes for 7th Semester subjects.",
    },
    {
      title: "Semester 8",
      href: "/tags/8th-Semester",
      description: "Click here to view notes for 8th Semester subjects.",
    },
  ];
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <img src="/logo.png" alt="logo" className="size-6"/>
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/contributors"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Top Contributors
      </Link>
      <NavigationMenu className="bg-transparent hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {notes.map((note) => (
                  <li key={note.title} className="hover:text-gray-900">
                    <Link
                      href={note.href}
                      className="block p-3 hover:bg-gray-100 rounded-md"
                    >
                      <div className="font-medium">{note.title}</div>
                      <p className="text-sm text-gray-500">
                        {note.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About us
      </Link>
    </nav>
  );
}
