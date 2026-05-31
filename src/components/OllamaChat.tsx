/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, Loader2, MessageSquare, X, ChevronDown } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Model {
  name: string;
  size: number;
}

export default function OllamaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [models, setModels] = useState<Model[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch available models on mount
  useEffect(() => {
    fetchModels();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/ollama-chat');
      const data = await response.json();
      if (data.models) {
        setModels(data.models);
        if (data.models.length > 0 && !selectedModel) {
          setSelectedModel(data.models[0].name);
        }
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedModel || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ollama-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Erreur: Pas de réponse du modèle.' }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erreur de connexion avec Ollama.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-neon-purple to-neon-blue text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        title="Chat Ollama Local"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-bg-card border border-border-dark rounded-lg shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-dark flex items-center justify-between bg-bg-dark">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-neon-purple" />
          <span className="font-bold text-white text-sm">Ollama Chat</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-text-muted hover:text-white transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Model Selector */}
      <div className="p-3 border-b border-border-dark bg-bg-dark/50">
        <div className="relative">
          <button
            onClick={() => setShowModelSelector(!showModelSelector)}
            className="w-full flex items-center justify-between p-2 bg-bg-dark border border-border-dark rounded text-xs text-white hover:border-neon-purple transition"
          >
            <span className="truncate">{selectedModel || 'Sélectionner un modèle'}</span>
            <ChevronDown size={14} className={`transition-transform ${showModelSelector ? 'rotate-180' : ''}`} />
          </button>
          
          {showModelSelector && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-bg-card border border-border-dark rounded max-h-40 overflow-y-auto z-10">
              {models.length === 0 ? (
                <div className="p-3 text-xs text-text-muted">Aucun modèle disponible</div>
              ) : (
                models.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => {
                      setSelectedModel(model.name);
                      setShowModelSelector(false);
                      setMessages([]);
                    }}
                    className="w-full p-2 text-left text-xs text-white hover:bg-bg-dark transition border-b border-border-dark/50 last:border-0"
                  >
                    {model.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-text-muted text-xs py-8">
            <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
            <p>Commencez une conversation avec {selectedModel}</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-xs ${
                  msg.role === 'user'
                    ? 'bg-neon-purple/20 text-white border border-neon-purple/30'
                    : 'bg-bg-dark text-text-muted border border-border-dark'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-bg-dark border border-border-dark rounded-lg p-3">
              <Loader2 size={16} className="animate-spin text-neon-purple" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-border-dark bg-bg-dark">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 bg-bg-card border border-border-dark rounded px-3 py-2 text-xs text-white outline-none focus:border-neon-purple transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-neon-purple text-white p-2 rounded hover:bg-neon-purple/80 transition disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </form>
    </div>
  );
}
