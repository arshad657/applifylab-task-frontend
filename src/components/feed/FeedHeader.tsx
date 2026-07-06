import Logo from "@/src/assets/icons/Logo";
import { FeedSearchBar } from "./FeedSearchBar";
import { ThemeToggleSwitch } from "./ThemeToggleSwitch";
import { ProfileMenu } from "./ProfileMenu";


export function FeedHeader() {
  return (
    <header className="sticky top-0 z-40 bg-bg5 backdrop-blur">
      <div className="containers flex h-16 items-center justify-between">
        <Logo />
        <FeedSearchBar />
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden sm:block">
            <ThemeToggleSwitch />
          </div>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
