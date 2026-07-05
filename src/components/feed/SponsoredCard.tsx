import Image from "next/image";
import { FeedPanel, FeedPanelHeader } from "./FeedPanel";

export function SponsoredCard() {
  return (
    <FeedPanel>
      <FeedPanelHeader title="You might like" />
      <a href="#" className="block overflow-hidden rounded-xl">
        <div className="relative h-32 w-full">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"
            alt=""
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <p className="text-sm font-medium text-foreground">
            Radovan SkillArena
          </p>
          <p className="text-xs text-muted-foreground">Sponsored</p>
        </div>
      </a>
    </FeedPanel>
  );
}
