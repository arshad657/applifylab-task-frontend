import { CenterFeed } from "./CenterFeed";
import { FeedHeader } from "./FeedHeader";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

export function FeedLayout() {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <FeedHeader />
      <div className="containers h-[calc(100vh-64px)] overflow-hidden py-6">
        <div className="h-full grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_320px]">
          <LeftSidebar />
          <CenterFeed />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
