"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeHealthIndicators } from "@/ai/flows/analyze-health-indicators";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export function FacialScanForm({ onAnalysis }) {
  const [image, setImage] = useState(null);
  const [scanStatus, setScanStatus] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
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

    // Simulate AI analysis with progress updates
    const analysisSteps = [
      { status: "Scanning facial regions…", progress: 25 },
      { status: "Analyzing skin texture…", progress: 50 },
      { status: "Identifying problem areas…", progress: 75 },
      { status: "Preparing remedies…", progress: 90 },
      { status: "Finalizing analysis…", progress: 100 },
    ];

    for (const step of analysisSteps) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate processing time
      setScanStatus(step.status);
      setScanProgress(step.progress);
    }

    try {
      const result = await analyzeHealthIndicators({ photoUrl: image });
      onAnalysis(result);
      setScanStatus("Analysis complete!");
    } catch (error) {
        toast({
            title: "Scan failed",
            description: error.message,
        })
      console.error("Error analyzing image:", error);
      setScanStatus("Analysis failed.");
      setScanProgress(0);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md">
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
      {image && !scanStatus && (
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

      {scanStatus && (
        <div className="w-full flex flex-col items-center">
          <Progress value={scanProgress} className="w-full mb-2" />
          <p className="text-sm text-gray-600">{scanStatus}</p>
        </div>
      )}
    </div>
  );
}
