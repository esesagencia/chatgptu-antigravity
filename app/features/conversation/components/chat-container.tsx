// ABOUTME: Smart container component that orchestrates conversation logic
// ABOUTME: Connects business hooks to presentation components

"use client";

import { useEffect, useRef, useState } from 'react';
import { useConversation } from '../hooks/useConversation';
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import { Chat } from './chat';
import { useConversationHandlers } from '../hooks/useConversationHandlers';
import { MejoraModal } from './mejora-modal';
import type { Message } from 'ai';

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

  // Check if reflexive
  const isReflexive = conversation.conversationId?.startsWith('reflexive-');

  // Scroll management
  // Disable auto-scroll for reflexive conversations so users can read from top
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>({
    enabled: !isReflexive
  });

  // Force scroll to top for reflexive conversations on load
  useEffect(() => {
    if (isReflexive && messagesContainerRef.current) {
      // Small timeout to ensure content loop has rendered
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      }, 50);
    }
  }, [conversation.conversationId, isReflexive, messagesContainerRef]);

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

    // Check if the current conversation is reflexive
    // We can check if the ID exists in the reflexiveConversations array
    // Assuming reflexiveConversations is imported or available via a helper
    // For now we will import it at the top
    const userMsgCount = conversation.messages.filter((m: Message) => m.role === 'user').length;

    // Trigger on 4th message, only once
    // AND ensure it's NOT a reflexive conversation
    if (userMsgCount === 4 && !hasShownModal && !conversation.isLoading && !isReflexive) {
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
  }, [conversation.messages, conversation.isLoading, hasShownModal, conversation.conversationId, isReflexive]);

  // Props for the presentation component

  // Props for the presentation component
  const chatProps = {
    // Explanation: existing props...
    conversationId: conversation.conversationId,
    messages: conversation.messages,
    input: conversation.input,
    isLoading: conversation.isLoading,
    isThinking: conversation.isThinking,
    isEmpty: conversation.isEmpty,
    isLimitReached: conversation.isLimitReached,
    readOnly: isReflexive, // Pass readOnly prop if reflexive

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