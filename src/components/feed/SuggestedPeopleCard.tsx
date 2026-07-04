import { FeedPanel, FeedPanelHeader } from "./FeedPanel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { suggestedPeople } from "../lib/mock/feedData";

export function SuggestedPeopleCard() {
  return (
    <FeedPanel>
      <FeedPanelHeader title="Suggested people" actionLabel="See all" actionHref="/find-friends" />
      <ul className="space-y-3">
        {suggestedPeople.map((person) => (
          <li key={person.id} className="flex items-center gap-3">
            <Avatar className="h-11 w-11">
              <AvatarImage src={person.avatarUrl} alt="" />
              <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {person.name}
              </p>
              {person.title && (
                <p className="truncate text-xs text-muted-foreground">
                  {person.title}
                </p>
              )}
            </div>
            <Button type="button" size="sm" variant="secondary">
              Connect
            </Button>
          </li>
        ))}
      </ul>
    </FeedPanel>
  );
}
