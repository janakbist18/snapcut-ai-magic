export const PrivacyPolicy = () => (
  <div className="container mx-auto py-12 px-4 max-w-4xl text-left">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">1. Information We Collect</h2>
      <p>We collect information you explicitly provide, including email addresses, uploaded images for processing, and billing information securely handled by our payment partners (eSewa).</p>

      <h2 className="text-xl font-semibold">2. Use of Information</h2>
      <p>Your uploaded images are processed temporarily to remove the background and are automatically deleted from our servers after 24 hours. We do not use your images to train AI models.</p>

      <h2 className="text-xl font-semibold">3. Data Security</h2>
      <p>We implement industry-standard security measures to protect your personal data and uploaded content.</p>
    </div>
  </div>
);

export const RefundCancellation = () => (
  <div className="container mx-auto py-12 px-4 max-w-4xl text-left">
    <h1 className="text-3xl font-bold mb-6">Refund and Cancellation Policy</h1>
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">1. Cancellation</h2>
      <p>You can cancel your subscription plan at any time through your dashboard. Cancellation will be effective at the end of your current active billing cycle.</p>

      <h2 className="text-xl font-semibold">2. Refunds</h2>
      <p>As SnapCut AI Magic provides immediately accessible digital currency/credits for image processing, we generally do not offer refunds once credits are used. However, if you experience technical issues or accidental double-charges, please contact support within 7 days for a full refund evaluation.</p>
    </div>
  </div>
);

export const ContactUs = () => (
  <div className="container mx-auto py-12 px-4 max-w-4xl text-left">
    <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
    <div className="mt-8 space-y-4">
      <p><strong>Trade Name:</strong> SnapCut AI Magic</p>
      <p><strong>Phone Number:</strong> 9842173751</p>
      <p><strong>Email:</strong> janakbist64@gmail.com</p>
      <p><strong>Address:</strong> Kathmandu, Manamaiju, Nepal</p>
      <p className="mt-6 text-muted-foreground">For any business inquiries, technical support, or billing issues, please reach out to us using the contact details above. We aim to respond within 24-48 business hours.</p>
    </div>
  </div>
);

export const ShippingDelivery = () => (
  <div className="container mx-auto py-12 px-4 max-w-4xl text-left">
    <h1 className="text-3xl font-bold mb-6">Shipping & Delivery Policy</h1>
    <div className="mt-8 space-y-4">
      <p>SnapCut AI Magic provides an online, cloud-based Software-as-a-Service (SaaS). We do not sell or ship physical goods.</p>
      <h2 className="text-xl font-semibold">1. Delivery of Services</h2>
      <p>Upon successful payment via eSewa, your account credits or subscription tier will be upgraded and activated <strong>instantly</strong>.</p>
      <h2 className="text-xl font-semibold">2. Delivery Issues</h2>
      <p>If your account status does not update within 5 minutes of a successful payment, please contact our support team immediately with your transaction ID.</p>
    </div>
  </div>
);

export const TermsConditions = () => (
  <div className="container mx-auto py-12 px-4 max-w-4xl text-left">
    <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
    <div className="mt-8 space-y-4">
      <p>Welcome to SnapCut AI Magic.</p>
      <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
      <p>By accessing and using our website, you agree to be bound by these terms. If you disagree, please do not use our services.</p>
      <h2 className="text-xl font-semibold">2. Acceptable Use</h2>
      <p>You agree not to upload illegal, explicit, or copyright-infringing material. We hold the right to ban accounts violating this policy immediately.</p>
      <h2 className="text-xl font-semibold">3. Service Availability</h2>
      <p>While we strive for 99.9% uptime, we do not guarantee uninterrupted access to the background removal API and are not liable for business losses due to downtime.</p>
    </div>
  </div>
);