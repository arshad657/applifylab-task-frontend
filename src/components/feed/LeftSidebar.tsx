import { EventsCard } from "./EventsCard";
import { ExploreCard } from "./ExploreCard";
import { SuggestedPeopleCard } from "./SuggestedPeopleCard";

export function LeftSidebar() {
  return (
    <aside
      className="custom-scrollbar scrollbar-hide hidden h-full min-h-0 overflow-y-auto pb-6 pr-1.5 space-y-4 lg:block"
      aria-label="Explore and suggestions"
    >
      <ExploreCard />
      <SuggestedPeopleCard />
      <EventsCard />
    </aside>
  );
}
