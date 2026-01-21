"use client";

import type { ChatRequestOptions, CreateMessage, Message } from "ai";
import { motion } from "framer-motion";
import type React from "react";
import {
  useRef,
  useEffect,
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

import { cn, sanitizeUIMessages } from "@/lib/utils";

import { ArrowUpIcon, StopIcon } from "@/app/features/conversation/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


const suggestedActions = [
  {
    title: "¿Por qué buscamos",
    label: "respuestas en la IA?",
    action: "¿Por qué buscamos respuestas en la IA?",
  },
  {
    title: "¿Cómo sé si mi",
    label: "criterio es el mío?",
    action: "¿Cómo sé si mi criterio es realmente mío?",
  },
  {
    title: "¿Qué significa",
    label: "perder el norte?",
    action: "¿Qué significa para vosotros perder el norte?",
  },
  {
    title: "¿Cómo dejo de",
    label: "delegar mi criterio?",
    action: "¿Cómo puedo empezar a dejar de delegar mi criterio?",
  },
];

export function MultimodalInput({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  messages,
  setMessages,
  append,
  handleSubmit,
  isLimitReached,
  className,
  readOnly,
}: {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  isLimitReached?: boolean;
  className?: string;
  readOnly?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    "",
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {});
    setLocalStorageInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, setLocalStorageInput, width]);

  // Prevent hydration mismatch by not rendering the interactive parts until mounted
  // The suggestions are fine, but the input area with local storage might differ
  if (!mounted) {
    return null; // Or a skeleton/placeholder that matches server output
  }

  return (
    <div className="relative w-full flex flex-col gap-4">
      {messages.length === 0 && !readOnly && (
        <div className="grid sm:grid-cols-2 gap-2 w-full">
          {suggestedActions.map((suggestedAction, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * index }}
              key={`suggested-action-${suggestedAction.title}-${index}`}
              className={index > 1 ? "hidden sm:block" : "block"}
            >
              <Button
                variant="ghost"
                onClick={async () => {
                  append({
                    role: "user",
                    content: suggestedAction.action,
                  });
                }}
                className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
              >
                <span className="font-medium">{suggestedAction.title}</span>
                <span className="text-muted-foreground">
                  {suggestedAction.label}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative w-full">
        {readOnly ? (
          <a
            href="https://www.somossur.es"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-between w-full p-4 rounded-xl border transition-all duration-200",
              "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              "cursor-pointer group select-none"
            )}
          >
            <span className="text-sm font-medium">Cuestionamos tu rumbo, descubre cómo</span>
            <ArrowUpIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity rotate-45" />
          </a>
        ) : (
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder={isLimitReached ? "Conversación finalizada." : "Send a message..."}
              value={input}
              onChange={handleInput}
              disabled={isLimitReached}
              className={cn(
                "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl !text-base bg-muted pb-10",
                isLimitReached && "opacity-50 cursor-not-allowed",
                className,
              )}
              rows={3}
              autoFocus
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  if (isLoading) {
                    toast.error("Please wait for the model to finish its response!");
                  } else {
                    submitForm();
                  }
                }
              }}
            />

            {isLoading ? (
              <Button
                className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
                onClick={(event) => {
                  event.preventDefault();
                  stop();
                  setMessages((messages) => sanitizeUIMessages(messages));
                }}
              >
                <StopIcon size={14} />
              </Button>
            ) : (
              <Button
                className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
                onClick={(event) => {
                  event.preventDefault();
                  submitForm();
                }}
                disabled={input.length === 0 || isLimitReached}
              >
                <ArrowUpIcon size={14} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
