import { useState, useCallback, useEffect } from "react";
import { Download, RefreshCw, Loader2, Wand2, History, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadBox from "@/components/UploadBox";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { GradientButton } from "@/components/ui/gradient-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/store/useAppStore";
import { removeBackgroundAPI } from "@/services/api";
import { addHistoryItem, getHistoryItems, deleteHistoryItem, type HistoryItem } from "@/lib/db";

const Editor = () => {
  const { originalImage, processedImage, isProcessing, setOriginalImage, setProcessedImage, setProcessing, reset } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [historyItems, setHistoryItems] = useState<(HistoryItem & { originalUrl: string })[]>([]);
  const [activeTab, setActiveTab] = useState("editor");

  const loadHistory = async () => {
    try {
      const items = await getHistoryItems();
      const itemsWithUrls = items.map(item => ({
        ...item,
        originalUrl: URL.createObjectURL(item.originalBlob)
      }));
      setHistoryItems(itemsWithUrls);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  useEffect(() => {
    loadHistory();
    return () => {
      // Cleanup object URLs
      historyItems.forEach(item => URL.revokeObjectURL(item.originalUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      setError(null);
      setCurrentFile(file);
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      setActiveTab("editor");
      // Don't process automatically - wait for user to click Remove Background button
    },
    [setOriginalImage]
  );

  const handleRemoveBackground = async () => {
    if (!currentFile) return;

    setProcessing(true);
    try {
      const result = await removeBackgroundAPI.processFile(currentFile);
      setProcessedImage(result.resultUrl);

      // Save to history
      await addHistoryItem({
        id: Date.now().toString(),
        originalBlob: currentFile,
        processedUrl: result.resultUrl,
        timestamp: Date.now(),
      });
      loadHistory();
    } catch (err) {
      console.error("Error processing image:", err);
      setError("Failed to process image. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async (url: string = processedImage!) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "snapcut-result.png";
      document.body.appendChild(a); // Required for Firefox
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback
      const a = document.createElement("a");
      a.href = url;
      a.download = "snapcut-result.png";
      a.target = "_blank";
      a.click();
    }
  };

  const handleDeleteHistory = async (id: string) => {
    try {
      await deleteHistoryItem(id);
      loadHistory();
    } catch (err) {
      console.error("Error deleting history:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-14">
                <TabsTrigger value="editor" className="text-base h-full">Editor</TabsTrigger>
                <TabsTrigger value="history" className="text-base h-full flex items-center gap-2">
                  <History className="w-4 h-4" /> History
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="mt-0">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Remove <span className="gradient-text">Image Background</span>
                </h1>
                <p className="text-muted-foreground">Upload an image and remove its background instantly</p>
              </div>

              {!originalImage && (
                <div className="max-w-2xl mx-auto">
                  <UploadBox onFileSelect={handleFileSelect} isProcessing={isProcessing} />
                </div>
              )}

              {originalImage && !processedImage && !isProcessing && (
                <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-3">
                <div className="border-b-2 border-primary pb-3">
                  <h3 className="text-xl font-semibold">Original</h3>
                  <p className="text-sm text-muted-foreground mt-1">Before background removal</p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border/50 glass-card">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <GradientButton onClick={handleRemoveBackground} size="lg" className="w-full py-6">
                  <Wand2 className="mr-2 w-5 h-5" /> Remove Background
                </GradientButton>
                <GradientButton variant="outline" onClick={reset} className="w-full">
                  <RefreshCw className="mr-2 w-5 h-5" /> Upload Different Image
                </GradientButton>
              </div>
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
              {/* Main Comparison Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Image Comparison</h2>

                {/* Side by Side Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Original Image - Left */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">Original</h3>
                      <p className="text-xs text-muted-foreground">Before background removal</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-primary/50 glass-card shadow-lg">
                      <img
                        src={originalImage}
                        alt="Original"
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                    </div>
                  </div>

                  {/* Result Image - Right */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">Result</h3>
                      <p className="text-xs text-muted-foreground">After background removal</p>
                    </div>
                    <div
                      className="rounded-2xl overflow-hidden border-2 border-primary/50 glass-card shadow-lg"
                      style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"><rect width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/></svg>')" }}
                    >
                      <img
                        src={processedImage}
                        alt="Result"
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <GradientButton onClick={() => handleDownload(processedImage!)} className="flex-1">
                  <Download className="mr-2 w-5 h-5" /> Download Result
                </GradientButton>
                <GradientButton variant="outline" onClick={reset} className="flex-1">
                  <RefreshCw className="mr-2 w-5 h-5" /> Remove Another Image
                </GradientButton>
              </div>
            </div>
          )}

          {error && (
            <div className="glass-card p-4 border-destructive/50 text-center mt-6">
              <p className="text-destructive">{error}</p>
            </div>
          )}
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-3xl font-bold mb-2">
                Your <span className="gradient-text">History</span>
              </h2>
              <p className="text-muted-foreground">View and download your previously processed images</p>
            </div>

            {historyItems.length === 0 ? (
              <div className="glass-card p-12 text-center border border-border/50 max-w-2xl mx-auto rounded-3xl">
                <History className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No history yet</h3>
                <p className="text-muted-foreground mb-6">Images you process will appear here automatically.</p>
                <GradientButton onClick={() => setActiveTab("editor")}>
                  Start Editing
                </GradientButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {historyItems.map((item) => (
                  <div key={item.id} className="glass-card p-4 rounded-2xl border border-border/50 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3 h-32 md:h-48 object-cover">
                      <div className="relative rounded-xl overflow-hidden bg-muted/50 border border-border/30">
                        <span className="absolute top-2 left-2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm z-10 font-medium">Original</span>
                        <img src={item.originalUrl} alt="Original" className="w-full h-full object-cover" />
                      </div>
                      <div className="relative rounded-xl overflow-hidden bg-muted/50 border border-primary/30"
                       style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"><rect width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/></svg>')" }}
                      >
                        <span className="absolute top-2 left-2 text-[10px] bg-primary text-primary-foreground backdrop-blur-sm px-2 py-1 rounded shadow-sm z-10 font-medium">Result</span>
                        <img src={item.processedUrl} alt="Processed" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <div className="flex gap-2">
                        <button onClick={() => handleDeleteHistory(item.id)} className="p-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <GradientButton size="sm" onClick={() => handleDownload(item.processedUrl)} className="px-3 py-0 h-9">
                          <Download className="w-4 h-4 mr-2" /> Download
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Editor;
