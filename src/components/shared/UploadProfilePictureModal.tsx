"use client";

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Camera, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { useUploadImageMutation } from "../../redux/api/postsApi";
import { useUpdateProfileMutation } from "../../redux/api/authApi";
import { updateAvatarUrl } from "../../redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { PiWarningCircleFill } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

export function UploadProfilePictureModal() {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // The modal should open if the user is authenticated but has no avatarUrl
  const isOpen = isAuthenticated && user && !user.avatarUrl;

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a profile picture first");
      return;
    }

    try {
      // 1. Upload file to Cloudinary via backend
      const formData = new FormData();
      formData.append("image", selectedFile);
      const uploadRes = await uploadImage(formData).unwrap();
      const secureUrl = uploadRes?.data?.url;

      if (!secureUrl) {
        throw new Error("Failed to get image URL from upload");
      }

      // 2. Update user profile on backend
      await updateProfile({ avatarUrl: secureUrl }).unwrap();

      // 3. Update auth state in Redux to close modal
      dispatch(updateAvatarUrl(secureUrl));

      toast.success("Profile picture uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to upload profile picture. Please try again.");
    }
  };

  const nameInitial = user ? user.firstName.charAt(0) : "U";

  return (
    <Dialog open={true} onOpenChange={() => { }}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-2xl w-full p-6 flex flex-col items-center gap-6 overflow-hidden bg-card border-gray-300"
      >
        <DialogHeader className="w-full text-center flex flex-col items-center gap-2">
          <DialogTitle className="text-xl font-medium text-foreground">Upload Profile Picture</DialogTitle>
          <DialogDescription className="text-xs font-medium flex items-center justify-center gap-2 text-destructive bg-destructive/10 dark:bg-destructive/20 border border-destructive/20 rounded-lg px-4 py-2.5 w-full">
            <PiWarningCircleFill size={16} />
            Please upload your profile picture to move forward
          </DialogDescription>
        </DialogHeader>

        {/* Circular Avatar Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary transition-all duration-300 flex items-center justify-center bg-muted"
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <Avatar className="h-full w-full">
              <AvatarFallback className="text-4xl font-bold bg-secondary text-secondary-foreground">{nameInitial}</AvatarFallback>
            </Avatar>
          )}

          {/* Hover Camera Icon overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="w-full flex flex-col gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full cursor-pointer"
            disabled={isUploading || isUpdating}
          >
            <UploadCloud className="h-4 w-4 mr-2" />
            {selectedFile ? "Change Image" : "Select Image"}
          </Button>

          <Button
            onClick={handleUpload}
            className="w-full cursor-pointer"
            disabled={!selectedFile || isUploading || isUpdating}
          >
            {isUploading || isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              "Upload & Continue"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
