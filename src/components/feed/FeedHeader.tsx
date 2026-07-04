import Logo from "@/src/assets/icons/Logo";
import { FeedSearchBar } from "./FeedSearchBar";
import { FeedNavIcons } from "./FeedNavIcons";
import { NotificationsMenu } from "./NotificationsMenu";
import { ThemeToggleSwitch } from "./ThemeToggleSwitch";
import { ProfileMenu } from "./ProfileMenu";


export function FeedHeader() {
  return (
    <header className="sticky top-0 z-40 bg-bg5 backdrop-blur">
      <div className="containers flex h-16 items-center gap-4">
        <Logo />
        <FeedSearchBar />
        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <FeedNavIcons />
          <NotificationsMenu />
          <div className="hidden sm:block">
            <ThemeToggleSwitch />
          </div>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
