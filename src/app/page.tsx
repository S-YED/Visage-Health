"use client";

import { useState } from "react";
import { FacialScanForm } from "@/components/facial-scan-form";
import { ImageAnalysisResult } from "@/components/image-analysis-result";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-10 w-full bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">Visage Health</span>
          <div className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">History</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Tips</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Profile</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto mt-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">See Your Face, Know Your Health</h1>
        <p className="mt-4 text-lg text-gray-600">Upload a photo and let our AI analyze your facial health indicators.</p>
        <Button className="mt-8 px-8 py-3">Get Started</Button>
      </section>

      <FacialScanForm onAnalysis={setAnalysisResult} />

      {analysisResult && (
        <ImageAnalysisResult
          indicators={analysisResult.indicators}
          pimples={analysisResult.pimples}
          overallHealth={analysisResult.overallHealth}
          disclaimer={analysisResult.disclaimer}
        />
      )}

      {/* Daily Tips Section (Placeholder) */}
      <section className="container mx-auto mt-12 p-6 bg-green-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Daily Skincare Tip</h2>
        <p className="mt-4 text-gray-700">
          Stay tuned! We'll pull a new tip from Firestore every day to help you improve your skin health.
        </p>
      </section>

      {/* "Coming Soon" Section */}
      <section className="container mx-auto mt-12 p-6 bg-blue-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Coming Soon: Mood & Fatigue Detection</h2>
        <p className="mt-4 text-gray-700">
          We're working on new features to analyze your mood and fatigue levels based on facial cues. Stay tuned!
        </p>
      </section>

      <Toaster />

      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2">
        <div className="flex justify-around">
          <div>Home</div>
          <div>History</div>
          <div>Tips</div>
          <div>Profile</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-100 p-4 text-center mt-12">
        <p className="text-gray-600">
          About | Contact | Privacy Policy
        </p>
      </footer>
    </div>
  );
}
