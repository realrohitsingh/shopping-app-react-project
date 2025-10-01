const plugin = require("tailwindcss/plugin");

/**
 * Tailwind CSS Component Plugin
 *
 * NOTE: .btn-primary, .btn-accent, and .input-glass are defined in App.css
 * with !important flags. Only utility components are defined here.
 */
module.exports = {
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        // Secondary Button - Used for logout, settings, etc.
        ".btn-secondary": {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.875rem 2rem",
          fontSize: "1rem",
          borderRadius: "0.875rem",
          fontWeight: "700",
          color: "var(--color-text)",
          backgroundColor: "rgb(26 26 26 / 0.6)",
          backdropFilter: "blur(16px)",
          border: "2px solid rgb(45 45 45 / 0.8)",
          boxShadow:
            "0 4px 12px rgb(0 0 0 / 0.4), 0 0 0 1px rgb(255 255 255 / 0.03) inset",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          cursor: "pointer",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(135deg, transparent, rgb(139 92 246 / 0.05), transparent)",
            transform: "translateX(-100%)",
            transition: "transform 0.6s",
          },
          "&:hover": {
            borderColor: "rgb(139 92 246 / 0.6)",
            backgroundColor: "rgb(26 26 26 / 0.9)",
            boxShadow:
              "0 12px 32px rgb(139 92 246 / 0.25), 0 0 0 1px rgb(139 92 246 / 0.15) inset, 0 0 20px rgb(139 92 246 / 0.15)",
            transform: "translateY(-3px) scale(1.02)",
            color: "rgb(255 255 255)",
          },
          "&:hover::before": {
            transform: "translateX(100%)",
          },
          "&:active": {
            transform: "translateY(-1px) scale(0.98)",
            transition: "all 0.1s",
          },
        },
        ".glass-panel": {
          position: "relative",
          backgroundColor: "rgb(26 26 26 / 0.85)",
          backdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid rgb(45 45 45 / 0.8)",
          borderRadius: "1.25rem",
          boxShadow:
            "0 25px 50px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.05) inset",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0",
            borderRadius: "1.25rem",
            padding: "1px",
            background:
              "linear-gradient(135deg, rgb(139 92 246 / 0.3), transparent, rgb(6 182 212 / 0.3))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            pointerEvents: "none",
            opacity: "0.5",
          },
        },
        ".card-product": {
          position: "relative",
          backgroundColor: "rgb(26 26 26 / 0.85)",
          backdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid var(--color-border)",
          borderRadius: "1.25rem",
          boxShadow:
            "0 25px 50px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.03) inset",
          padding: "1.5rem",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "rgb(139 92 246 / 0.6)",
            boxShadow:
              "0 30px 60px -12px rgb(139 92 246 / 0.25), 0 0 40px rgb(139 92 246 / 0.1)",
            transform: "translateY(-8px) scale(1.02)",
            backgroundColor: "rgb(26 26 26 / 0.95)",
          },
        },
        ".feature-card": {
          position: "relative",
          backgroundColor: "rgb(26 26 26 / 0.85)",
          backdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid var(--color-border)",
          borderRadius: "1.25rem",
          boxShadow:
            "0 25px 50px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.03) inset",
          padding: "2rem",
          textAlign: "left",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "rgb(139 92 246 / 0.5)",
            transform: "translateY(-6px)",
            boxShadow:
              "0 30px 60px -12px rgb(139 92 246 / 0.2), 0 0 40px rgb(139 92 246 / 0.1)",
            backgroundColor: "rgb(26 26 26 / 0.95)",
          },
        },
        ".link-primary": {
          color: "var(--color-primary)",
          textUnderlineOffset: "4px",
          transition: "all 0.2s",
          "&:hover": {
            color: "rgb(139 92 246 / 0.8)",
            textDecoration: "underline",
          },
        },
        ".link-accent": {
          color: "var(--color-accent)",
          textUnderlineOffset: "4px",
          transition: "all 0.2s",
          "&:hover": {
            color: "rgb(6 182 212 / 0.8)",
            textDecoration: "underline",
          },
        },
        ".card-title": {
          marginTop: "0.75rem",
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "white",
        },
        ".card-meta": {
          marginTop: "0.5rem",
          fontSize: "0.875rem",
          color: "var(--color-muted)",
        },
        ".badge": {
          display: "inline-flex",
          alignItems: "center",
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: "600",
          backgroundColor: "rgb(139 92 246 / 0.2)",
          color: "var(--color-primary)",
          border: "1px solid rgb(139 92 246 / 0.3)",
        },
      });
    }),
  ],
};
