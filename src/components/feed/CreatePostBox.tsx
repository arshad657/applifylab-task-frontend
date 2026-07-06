"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Video, CalendarDays, FileText, X, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FeedPanel } from "./FeedPanel";
import { useAuth } from "../shared/AuthContext";
import { useUploadImageMutation } from "../../redux/api/postsApi";
import { handleError } from "../../lib/handleError";

const ATTACHMENTS = [
  { id: "photo", label: "Photo", icon: ImageIcon, color: "text-emerald-500" },
  { id: "video", label: "Video", icon: Video, color: "text-rose-500" },
  { id: "event", label: "Event", icon: CalendarDays, color: "text-amber-500" },
  { id: "article", label: "Article", icon: FileText, color: "text-sky-500" },
] as const;

export function CreatePostBox({
  onSubmit,
}: {
  onSubmit: (content: string, imageUrl?: string) => void;
}) {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = user ? `${user.firstName} ${user.lastName}` : "User";
  const firstName = user?.firstName || "User";
  const avatarUrl = user?.avatarUrl || "https://i.pravatar.cc/150?img=12";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() && !selectedFile) return;

    try {
      let imageUrl: string | undefined;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const res = await uploadImage(formData).unwrap();
        imageUrl = res?.data?.url;
      }

      onSubmit(content, imageUrl);
      setContent("");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <FeedPanel className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={avatarUrl} alt="" />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's on your mind, ${firstName}?`}
              aria-label="Write a post"
              maxLength={2000}
              className="min-h-[44px] w-full"
            />
            {previewUrl && (
              <div className="relative mt-3 rounded-lg overflow-hidden max-h-60 border border-border group">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground shadow-sm transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-1.5">
            {ATTACHMENTS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  if (id === "photo") {
                    fileInputRef.current?.click();
                  }
                }}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary cursor-pointer"
              >
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <Button type="submit" size="sm" disabled={(!content.trim() && !selectedFile) || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin mr-1.5" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </form>
    </FeedPanel>
  );
}
