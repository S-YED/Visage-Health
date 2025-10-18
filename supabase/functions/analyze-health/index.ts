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
            content: `You are an advanced AI health analyzer. Analyze the facial image and provide a health assessment.

IMPORTANT: Structure your response EXACTLY as follows with proper markdown formatting:

**Overall Health Score**: [number 70-90]/100

**Key Findings**:
- [Clear, positive finding 1]
- [Clear, positive finding 2]
- [Clear, positive finding 3]
- [Clear, positive finding 4]

**Skin Health**:
- Texture: [brief positive assessment]
- Tone: [brief positive assessment]
- Hydration: [brief positive assessment]
- Clarity: [brief positive assessment]

**Facial Features**:
- Eyes: [positive health indicators]
- Skin elasticity: [positive observation]
- Complexion: [positive observation]
- Overall appearance: [positive observation]

**Potential Concerns**:
- [Minor concern 1 - Low severity]
- [Minor concern 2 - Low severity]
- [Minor concern 3 - Low severity]

**Recommendations**:
1. [Simple skincare tip]
2. [Simple lifestyle tip]
3. [Simple wellness tip]
4. [Simple health tip]
5. [Simple maintenance tip]

**Lifestyle Suggestions**:
- Diet: [brief positive suggestion]
- Sleep: [brief positive suggestion]
- Skincare: [brief positive suggestion]
- Hydration: [brief positive suggestion]
- Exercise: [brief positive suggestion]

Keep responses encouraging and positive. Focus on wellness rather than problems.`
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