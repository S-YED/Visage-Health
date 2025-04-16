"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ImageAnalysisResult({ indicators, pimples, disclaimer }) {
  return (
    <Card className="w-full max-w-md mt-8">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        {indicators && indicators.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Potential Health Indicators:</h3>
            <ul>
              {indicators.map((indicator, index) => (
                <li key={index} className="mb-2">
                  <strong>{indicator.indicator}</strong>: {indicator.description} (Confidence: {indicator.confidence})
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No potential health indicators found.</p>
        )}

        {pimples && pimples.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold mt-4 mb-2">Pimple Analysis:</h3>
            <ul>
              {pimples.map((pimple, index) => (
                <li key={index} className="mb-2">
                  <strong>Location:</strong> {pimple.location}, <strong>Severity:</strong> {pimple.severity}, <strong>Count:</strong> {pimple.count}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No pimples detected.</p>
        )}

        <p className="text-sm text-muted-foreground mt-4">{disclaimer}</p>
      </CardContent>
    </Card>
  );
}
