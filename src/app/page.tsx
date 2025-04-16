"use client";

import { useState } from "react";
import { FacialScanForm } from "@/components/facial-scan-form";
import { ImageAnalysisResult } from "@/components/image-analysis-result";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Visage Health Scan</h1>
      <FacialScanForm onAnalysis={setAnalysisResult} />
      {analysisResult && (
        <ImageAnalysisResult
          indicators={analysisResult.indicators}
          pimples={analysisResult.pimples}
          disclaimer={analysisResult.disclaimer}
        />
      )}
    </div>
  );
}
