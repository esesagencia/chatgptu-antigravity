// ABOUTME: Smart container component that orchestrates conversation logic
// ABOUTME: Connects business hooks to presentation components

"use client";

import { useEffect, useRef, useState } from 'react';
import { useConversation } from '../hooks/useConversation';
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import { Chat } from './chat';
import { useConversationHandlers } from '../hooks/useConversationHandlers';
import { MejoraModal } from './mejora-modal';

/**
 * Container component that manages chat state and business logic
 * This is the smart component that uses hooks and passes props to the presentation component
 */
export function ChatContainer() {
  const { setHandlers } = useConversationHandlers();
  const handlersSetRef = useRef(false);

  // Use the main conversation hook
  const conversation = useConversation({
    onConversationStart: (id) => {
      console.log('Conversation started:', id);
    },
    onNewConversation: (id) => {
      console.log('New conversation created:', id);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    },
  });

  // Expose conversation control functions to layout via context (only once)
  useEffect(() => {
    if (!handlersSetRef.current) {
      setHandlers({
        startNewConversation: conversation.startNewConversation,
        loadConversation: conversation.loadConversation,
      });
      handlersSetRef.current = true;
    }
  }, [setHandlers, conversation.startNewConversation, conversation.loadConversation]);

  // Scroll management
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  // Reset modal state when conversation changes
  useEffect(() => {
    setShowModal(false);
    setHasShownModal(false);
  }, [conversation.conversationId]);

  // Monitor user message count
  useEffect(() => {
    if (!conversation.messages) return;

    const userMsgCount = conversation.messages.filter(m => m.role === 'user').length;

    // Trigger on 6th message, only once
    if (userMsgCount === 6 && !hasShownModal && !conversation.isLoading) {
      // Small delay to allow bot response to start or finish (user said "2 seconds after bot response")
      // But here we might be checking while bot is thinking.
      // User said: "After bot responds". 
      // So we should check if the LAST message is from assistant AND userMsgCount is 6.
      const lastMsg = conversation.messages[conversation.messages.length - 1];

      if (lastMsg && lastMsg.role === 'assistant' && !conversation.isLoading) {
        const timer = setTimeout(() => {
          setShowModal(true);
          setHasShownModal(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [conversation.messages, conversation.isLoading, hasShownModal]);

  // Props for the presentation component
  const chatProps = {
    // Explanation: existing props...
    conversationId: conversation.conversationId,
    messages: conversation.messages,
    input: conversation.input,
    isLoading: conversation.isLoading,
    isThinking: conversation.isThinking,
    isEmpty: conversation.isEmpty,

    setInput: conversation.setInput,
    handleSubmit: conversation.handleSubmit,
    stop: conversation.stop,
    onNewConversation: conversation.startNewConversation,
    setMessages: conversation.setMessages,
    append: conversation.append,

    messagesContainerRef,
    messagesEndRef,
  };

  return (
    <>
      <Chat {...chatProps} />
      <MejoraModal
        isOpen={showModal}
        onContinue={() => setShowModal(false)}
      />
    </>
  );
}