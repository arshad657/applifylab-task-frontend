export type FeedUser = {
  id: string;
  name: string;
  title?: string;
  avatarUrl: string;
};

export type ExploreLink = {
  id: string;
  label: string;
  href: string;
  icon: "learning" | "insights" | "friends" | "bookmarks" | "group" | "gaming" | "events" | "memories";
  isNew?: boolean;
};

export type SuggestedPerson = FeedUser;

export type FeedEvent = {
  id: string;
  title: string;
  imageUrl: string;
  month: string;
  day: string;
};

export type Story = {
  id: string;
  user: FeedUser;
  imageUrl: string;
  viewed: boolean;
};

export type Comment = {
  id: string;
  user: FeedUser;
  content: string;
  postedAt: string;
  likesCount?: number;
  repliesCount?: number;
};

export type Post = {
  id: string;
  author: FeedUser;
  postedAt: string;
  isPublic: boolean;
  content: string;
  imageUrl?: string;
  reactionCount: number;
  commentCount: number;
  comments: Comment[];
  hiddenCommentCount?: number;
};

export type NotificationItem = {
  id: string;
  user: FeedUser;
  message: string;
  timeAgo: string;
  read: boolean;
};

export type Friend = FeedUser & {
  online: boolean;
  lastActive?: string;
};
