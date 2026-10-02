import { useState } from 'react'
import {
  Bot,
  Send,
  Cpu,
  Sparkles,
  FileCode,
  ShieldCheck,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  tokens?: number
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    role: 'assistant',
    content: "Greetings Eyamim. I am your local sovereign AI orchestrator running privately on your server hardware via Ollama. All queries, CCTV snapshot evaluations, and code generations are 100% private and never leave your LAN.",
  },
]

export default function AIHubView() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState<string>('')
  const [model, setModel] = useState<string>('llama3:8b')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: query }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate local inference
    await new Promise((r) => setTimeout(r, 900))

    let reply = `[Ollama ${model}] Received your command: "${query}". All system checks optimal. Ready to execute automated hub operations.`
    if (query.toLowerCase().includes('fleet') || query.toLowerCase().includes('route')) {
      reply = `[Fleet Dispatcher Agent] Analyzed active Traccar telemetry: Van #01 is currently maintaining 48 km/h in Sector 4. Fuel levels remain at 72%. All 3 active delivery waypoints are on schedule.`
    } else if (query.toLowerCase().includes('cctv') || query.toLowerCase().includes('camera')) {
      reply = `[Vision Guardian Agent] Evaluated latest high-resolution snapshot from CAM 01 (Front Gate): Identified a parcel delivery vehicle with 94% confidence. No unauthorized individuals detected in perimeter zones.`
    } else if (query.toLowerCase().includes('token') || query.toLowerCase().includes('coin')) {
      reply = `[Web3 Contract Agent] $UNCHARTED ERC-20 contract is compiled and ready for Foundry deployment on Polygon. Estimated deployment gas: 0.0042 MATIC ($0.003 USD).`
    }

    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: reply,
      tokens: 42,
    }
    setMessages((prev) => [...prev, assistantMsg])
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">Local AI Engine & Autonomous Agent Hub</h3>
          </div>
          <p className="text-xs text-white/40 font-mono">
            Engine: Ollama + OpenWebUI (NVIDIA CUDA) · 100% Offline · Subdomain: <code>ai.uncharteduser.brave</code>
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <select
            value={model}
            onChange={(e) => {
              setModel(e.target.value)
              toast.success(`Switched active model to ${e.target.value}`)
            }}
            className="bg-base-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-owner/40"
          >
            <option value="llama3:8b">Llama-3 (8B Instruct)</option>
            <option value="deepseek-coder:6.7b">DeepSeek-Coder (6.7B)</option>
            <option value="llava:7b">LLaVA (7B Vision Multimodal)</option>
            <option value="mistral:7b">Mistral (7B v0.3)</option>
          </select>
        </div>
      </div>

      {/* GPU Hardware Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 flex items-center gap-1 mb-1">
            <Cpu className="w-3 h-3 text-owner" /> GPU VRAM
          </span>
          <p className="text-base text-white font-medium">5.8 / 12 <span className="text-xs text-white/30">GB</span></p>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 flex items-center gap-1 mb-1">
            <Sparkles className="w-3 h-3 text-accent" /> Throughput
          </span>
          <p className="text-base text-white font-medium">48.2 <span className="text-xs text-white/30">tok/s</span></p>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 flex items-center gap-1 mb-1">
            <FileCode className="w-3 h-3 text-amber-400" /> Context Window
          </span>
          <p className="text-base text-white font-medium">8,192 <span className="text-xs text-white/30">tokens</span></p>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 flex items-center gap-1 mb-1">
            <ShieldCheck className="w-3 h-3 text-owner" /> Privacy
          </span>
          <p className="text-base text-owner font-medium">Zero Telemetry</p>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="h-72 rounded-xl border border-white/10 bg-black/40 p-4 overflow-y-auto space-y-4 font-mono text-xs">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-owner/20 border border-owner/40 flex items-center justify-center text-owner flex-shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-lg leading-relaxed ${
                m.role === 'user'
                  ? 'bg-owner/15 border border-owner/30 text-white'
                  : 'bg-white/5 border border-white/10 text-white/80'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-lg bg-owner/20 border border-owner/40 flex items-center justify-center text-owner animate-pulse">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-owner animate-ping" />
              <span>Generating response via local CUDA tensor cores...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2 text-[11px] font-mono">
        <span className="text-white/30 self-center">Quick Agents:</span>
        {[
          'Check fleet delivery status',
          'Evaluate CCTV front gate snapshot',
          'Draft $UNCHARTED token smart contract',
        ].map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.02] text-white/50 hover:text-owner hover:border-owner/30 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your local AI assistant or command autonomous agents..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-owner/40 transition-colors font-mono"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="px-5 rounded-xl bg-owner/15 border border-owner/30 text-owner hover:bg-owner/25 transition-colors flex items-center justify-center disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
