import { useState, useEffect, useRef } from 'react';

type Commands = {
  [key: string]: () => void;
};

/** Safari/iOS não suporta reconhecimento de voz de forma confiável; só a leitura (TTS) funciona. */
function isLikelyUnsupportedForRecognition(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);
  return isIOS || (isSafari && /iPhone|iPad|iPod/.test(ua));
}

function isVoiceRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  if (isLikelyUnsupportedForRecognition()) return false;
  const w = window as Window & { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export const useVoiceControl = (commands: Commands) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const recognitionRef = useRef<{ start(): void; stop(): void } | null>(null);
  const isVoiceSupported = isVoiceRecognitionSupported();

  const falarTexto = (texto: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.2;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isVoiceSupported) return;
    // Web Speech API - não está nos tipos do TypeScript
    const SR = (window as Window & { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
      .SpeechRecognition || (window as Window & { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new (SR as new () => {
      start(): void;
      stop(): void;
      continuous: boolean;
      lang: string;
      interimResults: boolean;
      onresult: ((e: { results: Array<{ 0: { transcript: string }; length: number }> }) => void) | null;
      onend: (() => void) | null;
    })();
    recognition.continuous = true;
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    recognition.onresult = (event: { results: Array<{ 0: { transcript: string }; length: number }> }) => {
      const last = event.results[event.results.length - 1];
      const transcript = (last[0] && last[0].transcript ? last[0].transcript : '')
        .toLowerCase()
        .trim();
      setLastCommand(transcript);

      Object.keys(commands).forEach((key) => {
        if (transcript.includes(key)) {
          commands[key]();
        }
      });
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognitionRef.current = recognition;
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [isListening, commands, isVoiceSupported]);

  const toggleListening = () => {
    if (!isVoiceSupported) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      window.speechSynthesis.cancel();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return { isListening, toggleListening, lastCommand, falarTexto, isVoiceSupported };
};
