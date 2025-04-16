"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ImageAnalysisResult({ indicators, disclaimer }) {
  return (
    <Card className="w-full max-w-md mt-8">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        {indicators && indicators.length > 0 ? (
          <ul>
            {indicators.map((indicator, index) => (
              <li key={index} className="mb-2">
                <strong>{indicator.indicator}</strong>: {indicator.description} (Confidence: {indicator.confidence})
              </li>
            ))}
          </ul>
        ) : (
          <p>No potential health indicators found.</p>
        )}
        <p className="text-sm text-muted-foreground mt-4">{disclaimer}</p>
      </CardContent>
    </Card>
  );
}

