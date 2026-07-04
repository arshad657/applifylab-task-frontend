"use client"
import { Search } from "lucide-react";

export function FeedSearchBar() {
  return (
    <form
      className="relative hidden w-full max-w-xs md:block"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder="Search Buddy Script"
        aria-label="Search"
        className="h-10 w-full rounded-full bg-bg3 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
      />
    </form>
  );
}
