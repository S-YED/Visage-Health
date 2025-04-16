"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeHealthIndicators } from "@/ai/flows/analyze-health-indicators";
import { useToast } from "@/hooks/use-toast";

export function FacialScanForm({ onAnalysis }) {
  const [image, setImage] = useState(null);
    const { toast } = useToast()

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
        toast({
            title: "Upload failed",
            description: "Please upload a valid file",
        })
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (!image) {
        toast({
            title: "Scan failed",
            description: "Please upload an image to scan",
        })
      return;
    }

    try {
      const result = await analyzeHealthIndicators({ photoUrl: image });
      onAnalysis(result);
    } catch (error) {
        toast({
            title: "Scan failed",
            description: error.message,
        })
      console.error("Error analyzing image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button asChild variant="outline">
          <span className="mr-2">Upload Facial Photo</span>
        </Button>
      </label>
      {image && (
        <div className="relative">
          <img
            src={image}
            alt="Uploaded Face"
            className="rounded-md shadow-md max-w-md"
          />
          <Button onClick={handleScan} className="absolute bottom-2 right-2">
            Analyze
          </Button>
        </div>
      )}
    </div>
  );
}

