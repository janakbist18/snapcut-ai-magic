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

export const removeBackgroundAPI = {
  process: (imageUrl: string) =>
    request<{ resultUrl: string }>("/api/remove-background", {
      method: "POST",
      body: JSON.stringify({ imageUrl }),
    }),
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
