// ============================================================
// STEP 1: Sign up at https://formspree.io
// STEP 2: Create a new form → copy your Form ID
// STEP 3: Replace "YOUR_FORM_ID" below with your actual ID
// ============================================================

import React, { useState } from "react";

const FORMSPREE_ID = "mqenykyw";

// ─── Types ───────────────────────────────────────────────────
interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  message: string;
}

type Status = "idle" | "submitting" | "success" | "error";

// ─── Modal Component ─────────────────────────────────────────
export function EnquiryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Full Name": form.fullName,
          "Company Name": form.company,
          Email: form.email,
          "Phone Number": form.phone,
          "Order Quantity": form.quantity,
          "Message / Requirements": form.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ fullName: "", company: "", email: "", phone: "", quantity: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    onClose();
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Modal box */}
      <div
        style={{
          background: "#fff", borderRadius: "12px",
          width: "100%", maxWidth: "520px",
          maxHeight: "90vh", overflowY: "auto",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.4rem", color: "#888", lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.3rem", fontWeight: 700, color: "#0a1628" }}>
            Enquire Now
          </h2>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
            Fill in the form and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* ── Success state ── */}
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
            <h3 style={{ margin: "0 0 8px", color: "#0a1628" }}>Enquiry Received!</h3>
            <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 1.5rem" }}>
              Thanks for reaching out. The Socksat team will be in touch shortly.
            </p>
            <button onClick={handleClose} style={btnStyle("#0a1628")}>Close</button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "grid", gap: "1rem" }}>

              {/* Row 1: Full Name + Company */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <label style={labelStyle}>
                  Full Name <span style={{ color: "#e03" }}>*</span>
                  <input
                    name="fullName" type="text" required
                    value={form.fullName} onChange={handleChange}
                    placeholder="Ahmed Al-Farsi"
                    style={inputStyle}
                  />
                </label>
                <label style={labelStyle}>
                  Company Name <span style={{ color: "#e03" }}>*</span>
                  <input
                    name="company" type="text" required
                    value={form.company} onChange={handleChange}
                    placeholder="Acme Corp"
                    style={inputStyle}
                  />
                </label>
              </div>

              {/* Row 2: Email + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <label style={labelStyle}>
                  Email <span style={{ color: "#e03" }}>*</span>
                  <input
                    name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="ahmed@company.com"
                    style={inputStyle}
                  />
                </label>
                <label style={labelStyle}>
                  Phone Number
                  <input
                    name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    placeholder="+962 7 1234 5678"
                    style={inputStyle}
                  />
                </label>
              </div>

              {/* Row 3: Order Quantity */}
              <label style={labelStyle}>
                Order Quantity
                <select name="quantity" value={form.quantity} onChange={handleChange} style={inputStyle}>
                  <option value="">Select a range…</option>
                  <option value="Under 50 pairs">Under 50 pairs</option>
                  <option value="50–200 pairs">50–200 pairs</option>
                  <option value="200–500 pairs">200–500 pairs</option>
                  <option value="500–1,000 pairs">500–1,000 pairs</option>
                  <option value="1,000+ pairs">1,000+ pairs</option>
                </select>
              </label>

              {/* Row 4: Message */}
              <label style={labelStyle}>
                Message / Requirements
                <textarea
                  name="message"
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us about your project — design ideas, materials, deadlines…"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
                />
              </label>

              {/* Error banner */}
              {status === "error" && (
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#c00", background: "#fff0f0", padding: "0.6rem 0.8rem", borderRadius: "6px" }}>
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                style={btnStyle("#0a1628", status === "submitting")}
              >
                {status === "submitting" ? "Sending…" : "Submit Enquiry"}
              </button>

            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Style helpers ────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: "flex", flexDirection: "column",
  gap: "5px", fontSize: "0.8rem",
  fontWeight: 600, color: "#333",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.6rem 0.75rem",
  border: "1px solid #ddd", borderRadius: "6px",
  fontSize: "0.9rem", color: "#111",
  background: "#fafafa", outline: "none",
  boxSizing: "border-box",
};

const btnStyle = (bg: string, disabled = false): React.CSSProperties => ({
  width: "100%", padding: "0.75rem",
  background: disabled ? "#999" : bg,
  color: "#fff", border: "none",
  borderRadius: "6px", fontSize: "0.95rem",
  fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
  letterSpacing: "0.03em",
});


// ─── Hook it into your existing App ──────────────────────────
// In your App.tsx, add this at the top:
//
//   import { EnquiryModal } from "./EnquiryModal";  // adjust path
//
// Then inside your component:
//
//   const [enquiryOpen, setEnquiryOpen] = useState(false);
//
// And replace your existing "ENQUIRE NOW" buttons with:
//
//   <button onClick={() => setEnquiryOpen(true)}>ENQUIRE NOW</button>
//   <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />