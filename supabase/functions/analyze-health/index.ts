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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Starting health analysis...');

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "system",
            content: `You are an advanced AI health analyzer specializing in facial analysis. Analyze the provided facial image and provide a comprehensive health assessment.

IMPORTANT: Provide analysis in the following structured format:

**Overall Health Score**: [0-100]

**Key Findings**:
- [Finding 1]
- [Finding 2]
- [Finding 3]

**Detailed Analysis**:

1. Skin Health:
   - Texture and tone
   - Hydration level
   - Problem areas
   
2. Facial Features:
   - Eye health indicators
   - Skin elasticity
   - Overall complexion

3. Potential Concerns:
   - List any areas requiring attention
   - Severity level for each

**Recommendations**:
1. [Specific recommendation 1]
2. [Specific recommendation 2]
3. [Specific recommendation 3]

**Lifestyle Suggestions**:
- Diet
- Sleep
- Skincare routine
- Hydration

IMPORTANT: This is an AI-powered preliminary analysis and should not replace professional medical advice. Always consult healthcare professionals for medical concerns.

Be specific, detailed, and provide actionable insights. Focus on observable facial health indicators.`
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