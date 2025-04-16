"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Smile, Sun, User } from "lucide-react"; // Example icons
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";

export function ImageAnalysisResult({ indicators, pimples, overallHealth, disclaimer }) {
  const hasIndicators = indicators && indicators.length > 0;
  const hasPimples = pimples && pimples.length > 0;

  return (
    <div className="w-full max-w-md mt-8 space-y-4">
      {overallHealth && (
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Overall Health Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800">{overallHealth}</p>
          </CardContent>
        </Card>
      )}

      {hasIndicators &&
        indicators.map((indicator, index) => (
          <Card key={index} className="rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-teal-500" />
                <span>{indicator.indicator}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{indicator.description}</p>
              {indicator.nextAction && (
                <p className="text-blue-600 mt-2">
                  Tip: {indicator.nextAction}
                </p>
              )}
              <Button variant="link">Learn More</Button>
            </CardContent>
          </Card>
        ))}

      {hasPimples &&
        pimples.map((pimple, index) => (
          <Card key={index} className="rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Circle className="h-5 w-5 text-red-500" />
                <span>Pimple Analysis - {pimple.location}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Severity: {pimple.severity}, Count: {pimple.count}
              </p>
              {pimple.remedies && pimple.remedies.length > 0 && (
                <>
                  <p className="text-sm font-medium mt-2">Suggested Remedies:</p>
                  <ul className="list-disc pl-5">
                    {pimple.remedies.map((remedy, i) => (
                      <li key={i} className="text-sm text-gray-700">{remedy}</li>
                    ))}
                  </ul>
                </>
              )}
              <Button variant="link">Learn More</Button>
            </CardContent>
          </Card>
        ))}

      {!hasIndicators && !hasPimples && (
        <Card className="rounded-lg shadow-md">
          <CardContent>
            <p className="text-gray-600">No health indicators or pimples detected.</p>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-gray-500 mt-4">{disclaimer}</p>
    </div>
  );
}
