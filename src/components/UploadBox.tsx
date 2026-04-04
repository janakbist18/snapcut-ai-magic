import { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

const UploadBox = ({ onFileSelect, isProcessing }: UploadBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: isProcessing,
  });

  // Handle paste event (Ctrl+V or Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (isProcessing) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            // Check file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
              alert("Image size must be less than 10MB");
              return;
            }
            // Check file type
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
              alert("Only JPG, PNG, and WEBP formats are supported");
              return;
            }
            onFileSelect(file);
            break;
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("paste", handlePaste);
      return () => container.removeEventListener("paste", handlePaste);
    }
  }, [onFileSelect, isProcessing]);

  return (
    <div
      ref={containerRef}
      {...getRootProps()}
      className={`
        relative group cursor-pointer rounded-2xl border-2 border-dashed p-12
        transition-all duration-300 text-center
        ${isDragActive
          ? "border-primary bg-primary/10 scale-[1.02]"
          : "border-border/50 hover:border-primary/50 hover:bg-muted/10"
        }
        ${isProcessing ? "opacity-50 pointer-events-none" : ""}
      `}
      tabIndex={0}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 via-violet-600/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          {isDragActive ? (
            <ImageIcon className="w-8 h-8 text-primary" />
          ) : (
            <Upload className="w-8 h-8 text-primary" />
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">
            {isDragActive ? "Drop your image here" : "Drag & drop your image"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse · Paste (Ctrl+V) · JPG, PNG, WEBP · Max 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
