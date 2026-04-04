const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // Get only the base64 part
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Mock background removal using canvas (simulates background removal for demo)
const mockRemoveBackground = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample background color from top-left pixel
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const tolerance = 60; // adjust as needed

      // Simple background removal: remove pixels similar to the top-left corner
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Check if pixel color is close to background color
        const diff = Math.max(Math.abs(r - bgR), Math.abs(g - bgG), Math.abs(b - bgB));

        // If pixel is similar to the corner (likely background), make it transparent
        if (diff < tolerance) {
          data[i + 3] = 0; // Set alpha to 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      // If image fails to load, create a dummy result
      resolve(imageUrl);
    };

    img.src = imageUrl;
  });
};

export const removeBackgroundAPI = {
  process: async (imageUrl: string) => {
    try {
      // Try to call the actual API first
      return await request<{ resultUrl: string }>("/api/remove-background", {
        method: "POST",
        body: JSON.stringify({ imageUrl }),
      });
    } catch (error) {
      // Fallback to mock if API fails
      console.warn("API failed, using mock background removal");
      const resultUrl = await mockRemoveBackground(imageUrl);
      return { resultUrl };
    }
  },

  // New method to handle file uploads
  processFile: async (file: File) => {
    try {
      // Send the image in binary format (multipart/form-data) to the n8n webhook
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://janakbist.app.n8n.cloud/webhook/Remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Webhook Error: ${response.statusText}`);
      }

      // The webhook responds with JSON { "url": "..." }
      const data = await response.json();

      if (!data.url) {
        throw new Error("Invalid response format from webhook");
      }

      return { resultUrl: data.url };
    } catch (error) {
      // Fallback to mock if API fails
      console.warn("Webhook failed, using mock background removal", error);
      const base64 = await fileToBase64(file);
      const dataUrl = `data:${file.type};base64,${base64}`;
      const resultUrl = await mockRemoveBackground(dataUrl);
      return { resultUrl };
    }
  },
};

export const paymentAPI = {
  createTransaction: (planId: string) =>
    request<{ paymentUrl: string; transactionId: string }>("/api/payment/create", {
      method: "POST",
      body: JSON.stringify({ planId }),
    }),
  verify: (transactionId: string, refId: string) =>
    request<{ success: boolean }>("/api/payment/verify", {
      method: "POST",
      body: JSON.stringify({ transactionId, refId }),
    }),
};

export const userAPI = {
  getProfile: () => request<{ credits: number; usage: number }>("/api/user/profile"),
  getUsage: () => request<{ daily: number; limit: number }>("/api/user/usage"),
};
