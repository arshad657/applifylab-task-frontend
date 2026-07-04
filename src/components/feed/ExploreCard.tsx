import Link from "next/link";
import {
  GraduationCap,
  BarChart3,
  Users,
  Bookmark,
  UsersRound,
  Gamepad2,
  CalendarDays,
  Clock,
  Badge,
} from "lucide-react";
import { ExploreLink } from "../types/feed";
import { FeedPanel } from "./FeedPanel";
import { exploreLinks } from "../lib/mock/feedData";

const ICONS: Record<ExploreLink["icon"], React.ComponentType<{ className?: string }>> = {
  learning: GraduationCap,
  insights: BarChart3,
  friends: Users,
  bookmarks: Bookmark,
  group: UsersRound,
  gaming: Gamepad2,
  events: CalendarDays,
  memories: Clock,
};

export function ExploreCard() {
  return (
    <FeedPanel>
      <h4 className="mb-4 text-base font-semibold text-foreground">Explore</h4>
      <ul className="space-y-1">
        {exploreLinks.map((link) => {
          const Icon = ICONS[link.icon];
          return (
            <li key={link.id}>
              <Link
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1">{link.label}</span>
                {link.isNew && (
                  <Badge className="text-[10px]">
                    New
                  </Badge>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </FeedPanel>
  );
}
