import { FeedLayout } from "@/src/components/feed/FeedLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed | Buddy Script",
  description: "See what your friends and communities are sharing.",
};

export default function FeedPage() {
  return <FeedLayout />;
}
