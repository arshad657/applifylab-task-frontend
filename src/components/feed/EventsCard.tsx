import Image from "next/image";
import { FeedPanel, FeedPanelHeader } from "./FeedPanel";
import { feedEvents } from "../lib/mock/feedData";

export function EventsCard() {
  return (
    <FeedPanel>
      <FeedPanelHeader title="Events" actionLabel="See all" actionHref="#" />
      <ul className="space-y-3">
        {feedEvents.map((event) => (
          <li key={event.id}>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-secondary"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={event.imageUrl}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium leading-snug text-foreground">
                {event.title}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </FeedPanel>
  );
}
