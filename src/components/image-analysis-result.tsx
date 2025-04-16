"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ImageAnalysisResult({ indicators, pimples, overallHealth, disclaimer }) {
  const hasIndicators = indicators && indicators.length > 0;
  const hasPimples = pimples && pimples.length > 0;

  return (
    <Card className="w-full max-w-md mt-8 rounded-lg shadow-md overflow-hidden">
      <CardHeader className="py-4">
        <CardTitle className="text-xl font-semibold tracking-tight">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {overallHealth && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Overall Health Assessment:</h3>
            <p className="text-gray-800">{overallHealth}</p>
          </div>
        )}

        <Accordion type="single" collapsible>
          {hasIndicators && (
            <AccordionItem value="indicators">
              <AccordionTrigger>
                Potential Health Indicators ({indicators.length})
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-none pl-0 mt-2">
                  {indicators.map((indicator, index) => (
                    <li key={index} className="mb-3 py-2 border-b border-gray-200 last:border-none">
                      <div className="flex justify-between items-center">
                        <strong className="text-gray-900">{indicator.indicator}</strong>
                        <Badge className="rounded-full px-3 py-1 text-xs font-medium">{indicator.confidence.toFixed(2)} Confidence</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{indicator.description}</p>
                      {indicator.nextAction && (
                        <p className="text-sm text-blue-600 mt-1">Next Action: {indicator.nextAction}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {hasPimples && (
            <AccordionItem value="pimples">
              <AccordionTrigger>
                Pimple Analysis ({pimples.length})
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-none pl-0 mt-2">
                  {pimples.map((pimple, index) => (
                    <li key={index} className="mb-3 py-2 border-b border-gray-200 last:border-none">
                      <strong className="text-gray-900">Location: {pimple.location}</strong>
                      <p className="text-sm text-gray-700">Severity: {pimple.severity}, Count: {pimple.count}</p>
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
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>

        {!hasIndicators && !hasPimples && (
          <p className="text-gray-600">No health indicators or pimples detected.</p>
        )}

        <p className="text-xs text-gray-500 mt-4">{disclaimer}</p>
      </CardContent>
    </Card>
  );
}
