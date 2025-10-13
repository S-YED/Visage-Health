import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Heart, Brain, AlertCircle, CheckCircle2, Lightbulb, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AnalysisResultProps {
  analysis: string;
  image: string;
}

interface ParsedAnalysis {
  score: number;
  keyFindings: string[];
  skinHealth: string[];
  facialFeatures: string[];
  concerns: string[];
  recommendations: string[];
  lifestyle: string[];
}

const AnalysisResult = ({ analysis, image }: AnalysisResultProps) => {
  const [parsedData, setParsedData] = useState<ParsedAnalysis | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const parsed = parseAnalysis(analysis);
    setParsedData(parsed);
    setTimeout(() => setIsAnimating(false), 500);
  }, [analysis]);

  const parseAnalysis = (text: string): ParsedAnalysis => {
    const scoreMatch = text.match(/Overall Health Score[:\s]*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 85;

    const extractSection = (sectionName: string): string[] => {
      const regex = new RegExp(`${sectionName}[:\\s]*([\\s\\S]*?)(?=\\n\\n|\\*\\*|$)`, 'i');
      const match = text.match(regex);
      if (!match || !match[1]) return [];
      
      return match[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && (line.startsWith('-') || line.startsWith('•') || /^\d+\./.test(line)))
        .map(line => line.replace(/^[-•]\s*|\d+\.\s*/, '').trim())
        .filter(line => line.length > 0);
    };

    return {
      score,
      keyFindings: extractSection('Key Findings'),
      skinHealth: extractSection('Skin Health'),
      facialFeatures: extractSection('Facial Features'),
      concerns: extractSection('Potential Concerns|Concerns'),
      recommendations: extractSection('Recommendations'),
      lifestyle: extractSection('Lifestyle Suggestions'),
    };
  };

  if (!parsedData) return null;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Analysis Complete</span>
        </div>
        <h2 className="text-4xl font-bold text-gradient">Your Health Insights</h2>
      </div>

      {/* Score and Image Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 card-premium overflow-hidden">
          <img
            src={image}
            alt="Analyzed"
            className="w-full h-auto rounded-xl"
          />
        </Card>

        <Card className="p-8 card-premium flex flex-col justify-center">
          <div className="text-center space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Health Score</p>
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="none" className="text-secondary" />
                  <circle cx="80" cy="80" r="70" stroke="url(#gradient)" strokeWidth="8" fill="none" 
                    strokeDasharray={`${(parsedData.score / 100) * 440} 440`} className="transition-all duration-1000" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(271 91% 65%)" />
                      <stop offset="100%" stopColor="hsl(271 91% 75%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gradient">{parsedData.score}</span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-primary/5">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">AI Powered</p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5">
                <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Advanced Analysis</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Findings */}
      {parsedData.keyFindings.length > 0 && (
        <Card className="p-8 card-premium">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Key Findings</h3>
          </div>
          <div className="grid gap-4">
            {parsedData.keyFindings.map((finding, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm">{finding}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Detailed Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Skin Health */}
        {parsedData.skinHealth.length > 0 && (
          <Card className="p-6 card-premium">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Skin Health</h3>
            </div>
            <ul className="space-y-3">
              {parsedData.skinHealth.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Facial Features */}
        {parsedData.facialFeatures.length > 0 && (
          <Card className="p-6 card-premium">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Facial Analysis</h3>
            </div>
            <ul className="space-y-3">
              {parsedData.facialFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Concerns */}
      {parsedData.concerns.length > 0 && (
        <Card className="p-8 card-premium border-orange-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-orange-500/10">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold">Areas of Attention</h3>
          </div>
          <div className="grid gap-4">
            {parsedData.concerns.map((concern, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{concern}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {parsedData.recommendations.length > 0 && (
        <Card className="p-8 card-premium bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Personalized Recommendations</h3>
          </div>
          <div className="grid gap-4">
            {parsedData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <Badge variant="outline" className="mt-1 flex-shrink-0">{index + 1}</Badge>
                <p className="text-sm flex-1">{rec}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Lifestyle Suggestions */}
      {parsedData.lifestyle.length > 0 && (
        <Card className="p-8 card-premium">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Lifestyle Suggestions</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {parsedData.lifestyle.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="text-center p-6 rounded-xl bg-card border border-border">
        <p className="text-sm text-muted-foreground">
          ⚕️ This analysis is powered by advanced AI and provides preliminary insights.
          It should not replace professional medical advice. Always consult healthcare
          professionals for medical concerns.
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;