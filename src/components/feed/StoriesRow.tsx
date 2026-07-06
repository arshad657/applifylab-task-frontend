"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useAuth } from "../shared/AuthContext";
import { stories } from "../lib/mock/feedData";

export function StoriesRow() {
  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || "https://i.pinimg.com/236x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t";

  return (
    <div
      className="mb-4 flex gap-3 overflow-x-auto pb-1"
      role="list"
      aria-label="Stories"
    >
      <div
        role="listitem"
        className="relative h-44 w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary"
      >
        <Image
          src={avatarUrl}
          alt=""
          fill
          sizes="112px"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button
          type="button"
          aria-label="Add to your story"
          className="absolute left-1/2 top-[calc(50%-14px)] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
        <p className="absolute inset-x-0 bottom-2 text-center text-xs font-medium text-white">
          Your story
        </p>
      </div>

      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          role="listitem"
          className="relative h-44 w-28 shrink-0 overflow-hidden rounded-2xl text-left"
        >
          <Image
            src={story.imageUrl}
            alt=""
            fill
            sizes="112px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <span
            className={`absolute left-2 top-2 h-8 w-8 overflow-hidden rounded-full border-2 ${story.viewed ? "border-muted-foreground/50" : "border-primary"
              }`}
          >
            <Image
              src={story.user.avatarUrl}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <p className="absolute inset-x-2 bottom-2 truncate text-xs font-medium text-white">
            {story.user.name}
          </p>
        </button>
      ))}
    </div>
  );
}
