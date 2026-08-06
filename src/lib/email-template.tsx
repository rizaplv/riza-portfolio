import * as React from "react";

interface EmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  source?: string;
}

export const ReactEmail: React.FC<EmailProps> = ({
  name,
  email,
  subject,
  message,
  company,
  source,
}) => {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: "640px", margin: "0 auto", padding: "24px", color: "#1f2937" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>New Message from Portfolio Site</h1>
      </header>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "8px", textTransform: "uppercase" }}>
          From
        </h2>
        <p style={{ margin: 0 }}>
          <strong>{name}</strong> &lt;{email}&gt;
          {company && ` (${company})`}
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "8px", textTransform: "uppercase" }}>
          Subject
        </h2>
        <p style={{ margin: 0 }}>{subject}</p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "8px", textTransform: "uppercase" }}>
          Message
        </h2>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{message}</p>
      </section>

      {source && (
        <footer style={{ borderTop: "1px solid #e5e7eb", paddingTop: "12px", fontSize: "12px", color: "#9ca3af" }}>
          <p style={{ margin: 0 }}>Source: {source}</p>
        </footer>
      )}
    </div>
  );
};
