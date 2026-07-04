"use client";

import { Bookmark, Bell, EyeOff, Pencil, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function PostMenu({ isOwner }: { isOwner?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Post options"
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
      >
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Bookmark className="h-4 w-4 text-primary" />
          Save post
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="h-4 w-4 text-primary" />
          Turn on notifications
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EyeOff className="h-4 w-4 text-primary" />
          Hide
        </DropdownMenuItem>
        {isOwner && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil className="h-4 w-4 text-primary" />
              Edit post
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete post
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
