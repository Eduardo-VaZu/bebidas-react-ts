import { useRef, useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import SpinnerLoding from "../components/spinner/SpinnerLoding";
import { PaperAirplaneIcon, UserIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function GenerateAI() {

    const { showNotification, sendMessage, loading, message, error } = useAppStore((state) => state)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [message, loading]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const prompt = form.get('prompt') as string;
        if (prompt.trim() === '') {
            showNotification({
                text: 'Por favor, ingresa un prompt',
                error: true,
                time: 3000
            })
            return;
        }
        formRef.current?.reset();
        await sendMessage(prompt);
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto w-full bg-slate-50 rounded-xl shadow-xl overflow-hidden border border-slate-200">
            {/* Header del chat */}
            <div className="bg-slate-800 p-4 shadow-md flex items-center gap-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                    <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">Asistente de Recetas</h1>
                    <p className="text-slate-300 text-xs">Potenciado por OpenRouter AI</p>
                </div>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 scroll-smooth">
                {message.length === 0 && !loading && !error && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 opacity-70">
                        <SparklesIcon className="h-20 w-20" />
                        <p className="text-lg font-medium">¿Qué bebida te gustaría preparar hoy?</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mx-auto max-w-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {message.map((item, index) => (
                    <div
                        key={index}
                        className={`flex w-full ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${item.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Icono */}
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm mt-1
                                ${item.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                                {item.role === 'user' ? (
                                    <UserIcon className="h-5 w-5 text-white" />
                                ) : (
                                    <SparklesIcon className="h-5 w-5 text-white" />
                                )}
                            </div>

                            {/* Burbuja */}
                            <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap
                                ${item.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                                }`}>
                                {item.content}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                    <div className="flex justify-start w-full">
                        <div className="flex gap-3 max-w-[75%]">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center shadow-sm mt-1">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                                <SpinnerLoding size={20} />
                                <span className="text-slate-500 text-sm animate-pulse">Pensando receta...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex gap-2 relative max-w-4xl mx-auto"
                >
                    <input
                        name="prompt"
                        id="prompt"
                        autoComplete="off"
                        className="flex-1 bg-slate-100 border-0 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 rounded-xl px-4 py-3 shadow-inner"
                        placeholder="Escribe aquí los ingredientes (ej. Tequila y Fresa)..."
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white p-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center group"
                    >
                        <PaperAirplaneIcon className="h-6 w-6 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    )
}
