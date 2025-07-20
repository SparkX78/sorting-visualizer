import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../../types/messages';
import { getBotReply } from '../../utils/getBotReply';
import { getBotExpression } from '../../utils/expression'; // 👈 Expression engine

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: userText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 🎭 Step 1: Add expressive emoji first
    const botEmoji = getBotExpression(userText);
    const expressionMessage: ChatMessage = {
      role: 'bot',
      content: botEmoji,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, expressionMessage]);

    // ⚡ Step 2: Get trimmed reply from Gemma
    const botText = await getBotReply(userText);
    const botMsg: ChatMessage = {
      role: 'bot',
      content: botText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      role: 'bot',
      content: `👋 Welcome! I'm SortBot — ask me about sorting, logic, code bugs, or deployment tips!`,
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMsg]);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      

      {/* Main Chat Container */}
      <div style={{
        position: 'fixed',
        bottom: 80,
        right: 20,
        width: 360,
        maxHeight: 520,
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Segoe UI, sans-serif',
        zIndex: 1000
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#0078D7',
          padding: '10px 14px',
          color: '#fff',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          fontSize: '15px'
        }}>
          🤖 SortBot · <span style={{ opacity: 0.8, marginLeft: 8 }}>Powered by Gemma:2b</span>
        </div>

        {/* Messages Section */}
        <div ref={chatRef} style={{
          flex: 1,
          padding: '12px 14px',
          overflowY: 'auto',
          backgroundColor: '#f8f8f8'
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 10
            }}>
              <div style={{
                backgroundColor: msg.role === 'user' ? '#0078D7' : '#E1E1E1',
                color: msg.role === 'user' ? '#fff' : '#000',
                padding: '10px 14px',
                borderRadius: 16,
                maxWidth: '70%',
                fontSize: '14px',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{
              fontStyle: 'italic',
              opacity: 0.6,
              fontSize: '13px',
              margin: '4px 10px'
            }}>
              SortBot is typing…
            </div>
          )}
        </div>

        {/* Input Section */}
        <div style={{
          padding: '10px',
          borderTop: '1px solid #ddd',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center'
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: '14px',
              marginRight: 8
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: '#0078D7',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}