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
import steveJobsImage from "../../../assets/images/feed/people1.png"
import rahyanImage from "../../../assets/images/feed/people2.png"
import dylanImage from "../../../assets/images/feed/people3.png"
import event1 from "../../../assets/images/feed/feed_event1.png"
import defaultAvatar from "../../../assets/images/feed/Avatar.png"
import manAvatar from "../../../assets/images/feed/man.png"
import profileAvatar from "../../../assets/images/feed/profile.png"
import f1 from "../../../assets/images/feed/f1.png"
import f2 from "../../../assets/images/feed/f2.png"
import f3 from "../../../assets/images/feed/f3.png"
import f4 from "../../../assets/images/feed/f4.png"


const localAvatars = [
  defaultAvatar.src,
  manAvatar.src,
  profileAvatar.src,
  steveJobsImage.src,
  rahyanImage.src,
  dylanImage.src,
];

function avatar(seed: number) {
  return localAvatars[seed % localAvatars.length];
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
  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: steveJobsImage.src },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: rahyanImage.src },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: dylanImage.src },
];

export const feedEvents: FeedEvent[] = [
  {
    id: "ev-1",
    title: "No more terrorism, no more cry",
    imageUrl:
      event1.src,
    month: "Jan",
    day: "28",
  },
  {
    id: "ev-2",
    title: "Design systems meetup 2026",
    imageUrl: event1.src,
    month: "Feb",
    day: "14",
  },
];

export const stories: Story[] = [
  {
    id: "s-1",
    user: { id: "p-2", name: "Ryan Roslansky", avatarUrl: avatar(23) },
    imageUrl: f1.src,
    viewed: false,
  },
  {
    id: "s-2",
    user: { id: "p-1", name: "Steve Jobs", avatarUrl: avatar(15) },
    imageUrl: f2.src,
    viewed: true,
  },
  {
    id: "s-3",
    user: { id: "p-4", name: "Karim Saif", avatarUrl: avatar(45) },
    imageUrl: f3.src,
    viewed: false,
  },
  {
    id: "s-4",
    user: { id: "p-5", name: "Amelia Chen", avatarUrl: avatar(48) },
    imageUrl: f4.src,
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
  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: steveJobsImage.src, online: false, lastActive: "5 minutes ago" },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: rahyanImage.src, online: true },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: dylanImage.src, online: true },

  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: steveJobsImage.src, online: false, lastActive: "5 minutes ago" },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: rahyanImage.src, online: true },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: dylanImage.src, online: true },

  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: steveJobsImage.src, online: false, lastActive: "5 minutes ago" },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: rahyanImage.src, online: true },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: dylanImage.src, online: true },

  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: steveJobsImage.src, online: false, lastActive: "5 minutes ago" },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: rahyanImage.src, online: true },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: dylanImage.src, online: true },

  { id: "p-1", name: "Steve Jobs", title: "CEO of Apple", avatarUrl: steveJobsImage.src, online: false, lastActive: "5 minutes ago" },
  { id: "p-2", name: "Ryan Roslansky", title: "CEO of LinkedIn", avatarUrl: rahyanImage.src, online: true },
  { id: "p-3", name: "Dylan Field", title: "CEO of Figma", avatarUrl: dylanImage.src, online: true },

];
