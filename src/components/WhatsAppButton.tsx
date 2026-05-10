import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ message = "Hello DAS Diamonds, I'd like to inquire about a diamond." }) {
  const url = `https://wa.me/918488080517?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-40 bottom-6 right-6 size-14 rounded-full bg-foreground text-background grid place-items-center shadow-luxury hover:scale-105 transition-transform"
    >
      <MessageCircle size={22} />
    </a>
  );
}
