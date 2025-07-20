interface ChatBubbleProps {
  onClick?: () => void;
}

export default function ChatBubble({ onClick }: ChatBubbleProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Chat"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: '50%',
        backgroundColor: '#0078D7',
        color: '#fff',
        fontSize: 24,
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
    >
      💬
    </button>
  );
}