"use client";

import { useState } from "react";
import { Badge, Bell, CheckCheck } from "lucide-react";

import { notifications as initialNotifications } from "@/src/components/lib/mock/feedData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function NotificationsMenu() {
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -right-0.5 -top-0.5 h-5 min-w-5 justify-center px-1">
            {unreadCount}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs text-muted-foreground"
            onClick={markAllRead}
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all read
          </Button>
        </div>
        <ul className="max-h-80 overflow-y-auto py-1">
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex gap-3 px-4 py-3 transition-colors hover:bg-secondary/60 ${item.read ? "" : "bg-primary/5"
                }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.user.avatarUrl} alt="" />
                <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm leading-snug text-foreground">
                  <span className="font-medium">{item.user.name}</span>{" "}
                  {item.message}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.timeAgo}
                </p>
              </div>
              {!item.read && (
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                />
              )}
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
