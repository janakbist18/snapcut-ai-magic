import { useState, useCallback } from "react";
import { Download, RefreshCw, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadBox from "@/components/UploadBox";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { GradientButton } from "@/components/ui/gradient-button";
import { useAppStore } from "@/store/useAppStore";

const Editor = () => {
  const { originalImage, processedImage, isProcessing, setOriginalImage, setProcessedImage, setProcessing, reset } = useAppStore();
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    (file: File) => {
      setError(null);
      const url = URL.createObjectURL(file);
      setOriginalImage(url);

      // Simulate AI processing (replace with real API call)
      setProcessing(true);
      setTimeout(() => {
        setProcessedImage(url); // In production, this would be the processed image URL
        setProcessing(false);
      }, 2500);
    },
    [setOriginalImage, setProcessedImage, setProcessing]
  );

  const handleDownload = () => {
    if (!processedImage) return;
    const a = document.createElement("a");
    a.href = processedImage;
    a.download = "snapcut-result.png";
    a.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Background <span className="gradient-text">Remover</span>
            </h1>
            <p className="text-muted-foreground">Upload an image and remove its background instantly</p>
          </div>

          {!originalImage && (
            <div className="max-w-2xl mx-auto">
              <UploadBox onFileSelect={handleFileSelect} isProcessing={isProcessing} />
            </div>
          )}

          {isProcessing && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 via-violet-600/20 to-blue-600/20 flex items-center justify-center mb-4 animate-pulse-glow">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <p className="text-lg font-semibold">Removing background...</p>
              <p className="text-sm text-muted-foreground mt-1">This usually takes a few seconds</p>
            </div>
          )}

          {originalImage && processedImage && !isProcessing && (
            <div className="space-y-6">
              <BeforeAfterSlider original={originalImage} processed={processedImage} />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton onClick={handleDownload}>
                  <Download className="mr-2 w-5 h-5" /> Download PNG
                </GradientButton>
                <GradientButton variant="outline" onClick={reset}>
                  <RefreshCw className="mr-2 w-5 h-5" /> New Image
                </GradientButton>
              </div>
            </div>
          )}

          {error && (
            <div className="glass-card p-4 border-destructive/50 text-center mt-6">
              <p className="text-destructive">{error}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Editor;
