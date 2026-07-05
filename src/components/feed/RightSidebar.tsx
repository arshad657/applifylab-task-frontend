import { SponsoredCard } from "./SponsoredCard";
import { FriendsListCard } from "./FriendsListCard";

export function RightSidebar() {
  return (
    <aside
      className="custom-scrollbar scrollbar-hide hidden h-full min-h-0 overflow-y-auto pb-6 pr-1.5 space-y-4 xl:block"
      aria-label="Suggestions and friends"
    >
      <SponsoredCard />
      <FriendsListCard />
    </aside>
  );
}
