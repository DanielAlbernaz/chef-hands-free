import { useState, useEffect, useRef } from 'react';

type Commands = {
  [key: string]: () => void;
};

export const useVoiceControl = (commands: Commands) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const recognitionRef = useRef<any>(null);

  const falarTexto = (texto: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.2;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true; 
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      setLastCommand(transcript);
      console.log("Ouvi:", transcript);

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
  }, [isListening, commands]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      window.speechSynthesis.cancel();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return { isListening, toggleListening, lastCommand, falarTexto };
};