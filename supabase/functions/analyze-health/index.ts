import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      throw new Error('No image data provided');
    }

    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    if (!AI_API_KEY) {
      throw new Error("AI_API_KEY is not configured");
    }

    console.log('Starting health analysis...');

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `You are an advanced AI health analyzer specializing in facial analysis. Analyze the provided facial image and provide a comprehensive health assessment.

CRITICAL: You MUST provide a COMPLETE response with ALL sections filled. Structure your response EXACTLY as follows:

**Overall Health Score**: [number between 60-95]/100

**Key Findings**:
- [Finding 1 - be specific about what you observe]
- [Finding 2 - be specific about what you observe]  
- [Finding 3 - be specific about what you observe]
- [Finding 4 - be specific about what you observe]

**Skin Health**:
- Texture: [detailed observation]
- Tone: [detailed observation]
- Hydration: [detailed observation]
- Clarity: [detailed observation]

**Facial Features**:
- Eyes: [detailed health indicators]
- Skin elasticity: [detailed observation]
- Complexion: [detailed observation]
- Overall appearance: [detailed observation]

**Potential Concerns**:
- [Concern 1 with severity level]
- [Concern 2 with severity level]
- [Concern 3 with severity level]

**Recommendations**:
1. [Specific actionable recommendation]
2. [Specific actionable recommendation]
3. [Specific actionable recommendation]
4. [Specific actionable recommendation]
5. [Specific actionable recommendation]

**Lifestyle Suggestions**:
- Diet: [specific suggestion]
- Sleep: [specific suggestion]
- Skincare: [specific suggestion]
- Hydration: [specific suggestion]
- Exercise: [specific suggestion]

IMPORTANT: Complete ALL sections fully. This is an AI-powered preliminary analysis and should not replace professional medical advice. Be specific, detailed, and provide actionable insights based on observable facial health indicators.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this facial image for health indicators and provide a comprehensive assessment."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Analysis complete");

    const analysis = data.choices[0]?.message?.content || "Analysis could not be completed";

    return new Response(
      JSON.stringify({ 
        analysis,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error("Error in health analysis:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});