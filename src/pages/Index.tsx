import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Upload, Sparkles, Shield, Zap, Brain } from 'lucide-react';
import CameraCapture from '@/components/CameraCapture';
import ImageUpload from '@/components/ImageUpload';
import AnalysisResult from '@/components/AnalysisResult';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ analysis: string; image: string } | null>(null);
  const { toast } = useToast();

  const analyzeImage = async (imageData: string) => {
    setAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-health', {
        body: { imageBase64: imageData }
      });

      if (error) throw error;

      if (data?.analysis) {
        setResult({
          analysis: data.analysis,
          image: imageData
        });
        
        toast({
          title: "Analysis Complete! 🎉",
          description: "Your health insights are ready",
        });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Please try again. Make sure the image shows your face clearly.",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Health Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gradient">Visage Health</span>
            <br />
            <span className="text-foreground">Your Personal Health Analyzer</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI technology analyzes your facial features to provide comprehensive health insights in seconds
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm">Advanced AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {analyzing && (
            <div className="text-center space-y-8 py-20">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                <div className="relative inline-flex p-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <Brain className="w-16 h-16 text-primary animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-gradient">Analyzing Your Health...</h3>
                <p className="text-muted-foreground text-lg">Our advanced AI is processing your image</p>
              </div>

              <div className="max-w-md mx-auto space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border animate-fade-in">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm">Detecting facial features...</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="text-sm">Analyzing skin health indicators...</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span className="text-sm">Generating personalized insights...</span>
                </div>
              </div>
            </div>
          )}

          {!analyzing && !result && (
            <Tabs defaultValue="camera" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="camera" className="gap-2">
                  <Camera className="w-4 h-4" />
                  Live Camera
                </TabsTrigger>
                <TabsTrigger value="upload" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="camera" className="space-y-8">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-3xl font-bold">Capture Your Photo</h2>
                  <p className="text-muted-foreground">Make sure your face is well-lit and clearly visible</p>
                </div>
                <CameraCapture onCapture={analyzeImage} />
              </TabsContent>

              <TabsContent value="upload" className="space-y-8">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-3xl font-bold">Upload Your Photo</h2>
                  <p className="text-muted-foreground">Choose a clear photo of your face for best results</p>
                </div>
                <ImageUpload onUpload={analyzeImage} />
              </TabsContent>
            </Tabs>
          )}

          {result && <AnalysisResult analysis={result.analysis} image={result.image} />}
        </div>
      </section>

      {/* Features Section */}
      {!analyzing && !result && (
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Visage Health?</h2>
              <p className="text-muted-foreground">Cutting-edge AI technology for comprehensive health insights</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-premium p-8 rounded-2xl text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Advanced AI</h3>
                <p className="text-muted-foreground">
                  Powered by state-of-the-art machine learning models trained on millions of facial health indicators
                </p>
              </div>

              <div className="card-premium p-8 rounded-2xl text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-muted-foreground">
                  Get comprehensive health insights in seconds with detailed recommendations and actionable advice
                </p>
              </div>

              <div className="card-premium p-8 rounded-2xl text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Private & Secure</h3>
                <p className="text-muted-foreground">
                  Your images are processed securely and never stored. Complete privacy guaranteed
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Built by <span className="text-primary font-medium">Syed Khaja Moinuddin</span>
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 Syed Khaja Moinuddin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;