import { useState } from "react";
import { toast } from "react-hot-toast";

function useFileUpload() {
  const [uploadResponse, setUploadResponse] = useState();
  const [isUploading, setIsUploading] = useState();

  const uploadFile = async (formData) => {
    setIsUploading(true);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmpir7wfy/image/upload",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setUploadResponse(data.url);
      setIsUploading(false);
      return data.url;
    } catch (error) {
      setIsUploading(false);
      toast.error("Error uploading file");
      throw error;
    }
  };
  return { uploadFile, uploadResponse, isUploading, setUploadResponse };
}

export default useFileUpload;
