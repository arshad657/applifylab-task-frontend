"use client";

import Link from "next/link";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { currentUser } from "../lib/mock/feedData";

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-secondary"
        aria-label={`Account menu for ${currentUser.name}`}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src={currentUser.avatarUrl} alt="" />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-medium text-foreground lg:inline">
          {currentUser.name}
        </span>
        <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:inline" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-3 px-2.5 py-2">
          <Avatar className="h-11 w-11">
            <AvatarImage src={currentUser.avatarUrl} alt="" />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {currentUser.name}
            </p>
            {currentUser.title && (
              <p className="truncate text-xs text-muted-foreground">
                {currentUser.title}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/profile" />}>
          <UserRound className="h-4 w-4 text-muted-foreground" />
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/settings" />}>
          <Settings className="h-4 w-4 text-muted-foreground" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/login" />} className="text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
