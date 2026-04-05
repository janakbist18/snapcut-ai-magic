import CryptoJS from "crypto-js";

// Helper for generating eSewa signature on frontend (FOR DEMONSTRATION ONLY)
// Note: In production, signature generation MUST happen on your secure backend server
// because exposing VITE_ESEWA_SECRET_KEY in frontend is extremely dangerous!

export async function generateEsewaSignature(
  total_amount: string,
  transaction_uuid: string,
  product_code: string
) {
  const secretKey = import.meta.env.VITE_ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return hashInBase64;
}

export async function initiateEsewaPayment(amount: number) {
  try {
    const merchantCode = import.meta.env.VITE_ESEWA_MERCHANT_CODE || "EPAYTEST";
    const apiUrl = import.meta.env.VITE_ESEWA_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const transactionUuid = `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const totalAmount = amount.toString();

    // Calculate signature
    const signature = await generateEsewaSignature(totalAmount, transactionUuid, merchantCode);

    // Create standard hidden form to POST to eSewa
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", apiUrl);

    const params: Record<string, string> = {
      amount: totalAmount,
      tax_amount: "0",
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: merchantCode,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `${window.location.origin}/dashboard?payment=success`,
      failure_url: `${window.location.origin}/pricing?payment=failed`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signature,
    };

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("Failed to initiate payment. Please try again.");
  }
}
