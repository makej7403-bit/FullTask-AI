import { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  async function sendMessage(prompt) {
    if (!prompt.trim()) return;

    const userMsg = { role: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      const text = data.result || '';

      let typed = '';
      const aiMsg = { role: 'assistant', text: '' };
      setMessages(prev => [...prev, aiMsg]);

      for (let i = 0; i < text.length; i++) {
        typed += text[i];
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', text: typed };
          return copy;
        });
        await new Promise(r => setTimeout(r, 10));
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error: ' + err.message }]);
    }

    setLoading(false);
    setTimeout(() => {
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* SEO + Google Verification */}
      <Head>
        <title>Full Task AI – Smart Scholarship & Learning Assistant</title>
        <meta
          name="description"
          content="Full Task AI helps you find scholarships, books, courses, and provides instant AI chat support created by Akin S Sokpah from Liberia."
        />
        <meta
          name="keywords"
          content="Full Task AI, AI chatbot, scholarships, online courses, Akin Sokpah, Liberia"
        />
        <meta name="google-site-verification" content="d8d_1kq-ciq9ByO6gLexUEE9t9snSDd8vwgfnhycVAo" />
      </Head>

      <div style={styles.page}>
        <div style={styles.overlay} />
        <main style={styles.container}>
          <div style={styles.chat}>
            <div ref={containerRef} style={styles.messages}>
              {messages.map((m, i) => (
                <div key={i} style={m.role === 'user' ? styles.user : styles.ai}>
                  {m.text}
                </div>
              ))}
            </div>

            <div style={styles.inputBar}>
              <textarea
                placeholder={loading ? 'Thinking...' : 'Ask me anything...'}
                value={input}
                disabled={loading}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                style={styles.textarea}
              />

              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                style={styles.button}
              >
                {loading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    position: 'relative'
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, #FFD36E, #0B84FF)',
    zIndex: -1
  },
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  chat: {
    width: '820px',
    maxWidth: '95vw',
    height: '90vh',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(8px)'
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  user: {
    alignSelf: 'flex-end',
    background: 'rgba(255,255,255,0.9)',
    padding: '10px 14px',
    borderRadius: 10
  },
  ai: {
    alignSelf: 'flex-start',
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: 10
  },
  inputBar: {
    display: 'flex',
    gap: 10,
    marginTop: 10
  },
  textarea: {
    flex: 1,
    minHeight: 50,
    maxHeight: 120,
    borderRadius: 10,
    padding: 10,
    resize: 'none',
    border: 'none'
  },
  button: {
    padding: '0 20px',
    background: '#FFD36E',
    border: 'none',
    borderRadius: 10,
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};
