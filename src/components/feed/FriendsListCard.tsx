"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { FeedPanel, FeedPanelHeader } from "./FeedPanel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { friends } from "../lib/mock/feedData";

export function FriendsListCard() {
  const [query, setQuery] = useState("");

  const filtered = friends.filter((friend) =>
    friend.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <FeedPanel>
      <FeedPanelHeader title="Your friends" actionLabel="See all" actionHref="/find-friends" />

      <div className="relative mb-4">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search friends"
          aria-label="Search friends"
          className="h-10 w-full rounded-full bg-bg3 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No friends match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ul className="space-y-1">
          {filtered.map((friend) => (
            <li key={friend.id}>
              <a
                href="/profile"
                className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-secondary"
              >
                <span className="relative shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={friend.avatarUrl} alt="" />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {friend.online && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-bg5 bg-success"
                    />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {friend.name}
                  </p>
                  {friend.title && (
                    <p className="truncate text-xs text-muted-foreground">
                      {friend.title}
                    </p>
                  )}
                </div>
                {!friend.online && friend.lastActive && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {friend.lastActive}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </FeedPanel>
  );
}
