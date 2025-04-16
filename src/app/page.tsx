"use client";

import { useState } from "react";
import { FacialScanForm } from "@/components/facial-scan-form";
import { ImageAnalysisResult } from "@/components/image-analysis-result";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">Visage Health Scan</h1>
      <FacialScanForm onAnalysis={setAnalysisResult} />
      {analysisResult && (
        <ImageAnalysisResult
          indicators={analysisResult.indicators}
          pimples={analysisResult.pimples}
          overallHealth={analysisResult.overallHealth}
          disclaimer={analysisResult.disclaimer}
        />
      )}
      <Toaster />
    </div>
  );
}
