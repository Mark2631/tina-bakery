import { whatsappUrl } from "@/lib/utils";

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-wa"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Place an order on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          d="M16 3.1a12.3 12.3 0 0 0-10.6 18.5L3.8 28l6.6-1.7A12.3 12.3 0 1 0 16 3.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 10.3c-.3-.7-.7-.7-1-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3s1.3 3.4 1.5 3.6c.2.2 2.6 4.1 6.4 5.6 3.2 1.3 3.8 1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5-.1-.7L12 10.3Z"
          fill="currentColor"
        />
      </svg>
      <span>Order on WhatsApp</span>
    </a>
  );
}
