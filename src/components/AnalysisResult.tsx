import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Heart, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnalysisResultProps {
  analysis: string;
  image: string;
}

const AnalysisResult = ({ analysis, image }: AnalysisResultProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < analysis.length) {
        setDisplayedText(analysis.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [analysis]);

  const parseScore = (text: string): number => {
    const scoreMatch = text.match(/Overall Health Score[:\s]*(\d+)/i);
    return scoreMatch ? parseInt(scoreMatch[1]) : 85;
  };

  const score = parseScore(analysis);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Analysis Complete</span>
        </div>
        <h2 className="text-4xl font-bold text-gradient">Your Health Insights</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Preview */}
        <Card className="p-6 card-premium">
          <img
            src={image}
            alt="Analyzed"
            className="w-full h-auto rounded-xl"
          />
        </Card>

        {/* Health Score */}
        <Card className="p-8 card-premium flex flex-col justify-center">
          <div className="text-center space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Health Score</p>
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-secondary"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(score / 100) * 440} 440`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(271 91% 65%)" />
                      <stop offset="100%" stopColor="hsl(271 91% 75%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gradient">{score}</span>
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

      {/* Detailed Analysis */}
      <Card className="p-8 card-premium">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {displayedText}
            {isTyping && <span className="animate-pulse">▊</span>}
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        <p>
          ⚕️ This analysis is powered by advanced AI and provides preliminary insights.
          It should not replace professional medical advice. Always consult healthcare
          professionals for medical concerns.
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;