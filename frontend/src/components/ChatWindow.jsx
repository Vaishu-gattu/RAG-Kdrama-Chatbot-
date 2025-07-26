import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `**Welcome!** Ask me anything about Korean Dramas - whether it's _recommendations_, actors, genres, or recent shows.`,
    },
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { sender: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:8000/chat', { question });
      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setQuestion('');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-white/60 rounded-lg mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-xl max-w-[80%] text-sm whitespace-pre-wrap ${
              msg.sender === 'user'
                ? 'bg-purple-200 self-end text-right ml-auto'
                : 'bg-purple-100 self-start text-left mr-auto'
            }`}
          >
            {msg.sender === 'bot' ? (
              <ReactMarkdown
                children={msg.text}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  p: ({ children }) => (
                    <p className="mb-1">{children}</p>
                  ),
                  br: () => <br />,
                }}
              />
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && (
          <div className="bg-purple-50 text-sm px-4 py-2 rounded-xl max-w-[80%]">
            Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Field */}
      <form onSubmit={sendMessage} className="flex gap-2 mb-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about K-dramas..."
          className="flex-1 px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl transition"
        >
          Send
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-2">
        Developed by{' '}
        <span className="font-semibold text-purple-600">Vaishu</span> ·{' '}
        <a
          href="https://github.com/vaishu-gattu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline"
        >
          GitHub
        </a>{' '}
        ·{' '}
        <a
          href="https://www.linkedin.com/in/vaishu-gattu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default ChatWindow;
