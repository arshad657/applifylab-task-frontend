import type {
  Comment,
  ExploreLink,
  FeedEvent,
  FeedUser,
  Friend,
  NotificationItem,
  Post,
  Story,
  SuggestedPerson,
} from "../../types/feed";

function avatar(seed: number) {
  return `https://i.pravatar.cc/150?img=${seed}`;
}

export const currentUser: FeedUser = {
  id: "u-0",
  name: "Dylan Field",
  title: "CEO of Figma",
  avatarUrl: avatar(12),
};

export const exploreLinks: ExploreLink[] = [
  { id: "e-1", label: "Learning", href: "#", icon: "learning", isNew: true },
  { id: "e-2", label: "Insights", href: "#", icon: "insights" },
  { id: "e-3", label: "Find friends", href: "/find-friends", icon: "friends" },
  { id: "e-4", label: "Bookmarks", href: "#", icon: "bookmarks" },
  { id: "e-5", label: "Groups", href: "/group", icon: "group" },
  { id: "e-6", label: "Gaming", href: "#", icon: "gaming", isNew: true },
  { id: "e-7", label: "Events", href: "#", icon: "events" },
  { id: "e-8", label: "Memories", href: "#", icon: "memories" },
];

export const suggestedPeople: SuggestedPerson[] = [
  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: avatar(15) },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: avatar(23) },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: avatar(31) },
];

export const feedEvents: FeedEvent[] = [
  {
    id: "ev-1",
    title: "No more terrorism, no more cry",
    imageUrl:
      "https://images.unsplash.com/photo-1522158637959-30385a09e0da?auto=format&fit=crop&w=400&q=80",
    month: "Jan",
    day: "28",
  },
  {
    id: "ev-2",
    title: "Design systems meetup 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
    month: "Feb",
    day: "14",
  },
];

export const stories: Story[] = [
  {
    id: "s-1",
    user: { id: "p-2", name: "Ryan Roslansky", avatarUrl: avatar(23) },
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    viewed: false,
  },
  {
    id: "s-2",
    user: { id: "p-1", name: "Steve Jobs", avatarUrl: avatar(15) },
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    viewed: true,
  },
  {
    id: "s-3",
    user: { id: "p-4", name: "Karim Saif", avatarUrl: avatar(45) },
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
    viewed: false,
  },
  {
    id: "s-4",
    user: { id: "p-5", name: "Amelia Chen", avatarUrl: avatar(48) },
    imageUrl:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80",
    viewed: false,
  },
];

const sampleComments: Comment[] = [
  {
    id: "c-1",
    user: { id: "p-6", name: "Radovan SkillArena", avatarUrl: avatar(52) },
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    postedAt: "3 minutes ago",
  },
];

export const posts: Post[] = [
  {
    id: "post-1",
    author: { id: "p-4", name: "Karim Saif", title: undefined, avatarUrl: avatar(45) },
    postedAt: "5 minutes ago",
    audience: "Public",
    content: "Healthy Tracking App — excited to finally ship this one.",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    reactionCount: 9,
    reactionAvatars: [avatar(15), avatar(23), avatar(31)],
    commentCount: 12,
    shareCount: 122,
    hiddenCommentCount: 4,
    comments: sampleComments,
  },
  {
    id: "post-2",
    author: { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: avatar(15) },
    postedAt: "1 hour ago",
    audience: "Friends",
    content:
      "Simplicity is the ultimate sophistication. Spent the morning sketching a few new ideas — more soon.",
    reactionCount: 24,
    reactionAvatars: [avatar(23), avatar(31), avatar(45)],
    commentCount: 6,
    shareCount: 18,
    comments: [],
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n-1",
    user: { id: "p-1", name: "Steve Jobs", avatarUrl: avatar(15) },
    message: "posted a link in your timeline.",
    timeAgo: "42 minutes ago",
    read: false,
  },
  {
    id: "n-2",
    user: { id: "p-7", name: "Freelancer USA", avatarUrl: avatar(60) },
    message: 'changed the group name to "Freelancer USA HQ".',
    timeAgo: "1 hour ago",
    read: false,
  },
  {
    id: "n-3",
    user: { id: "p-2", name: "Ryan Roslansky", avatarUrl: avatar(23) },
    message: "commented on your post.",
    timeAgo: "3 hours ago",
    read: true,
  },
];

export const friends: Friend[] = [
  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: avatar(15), online: false, lastActive: "5 minutes ago" },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: avatar(23), online: true },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: avatar(31), online: true },
  { id: "p-5", name: "Amelia Chen", title: "Product Designer", avatarUrl: avatar(48), online: true },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
  { id: "p-6", name: "Radovan SkillArena", title: "Founder", avatarUrl: avatar(52), online: false, lastActive: "5 minutes ago" },
];
