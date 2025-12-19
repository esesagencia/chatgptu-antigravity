// ABOUTME: Layout for chat routes with sidebar and React Query provider.
// ABOUTME: Wraps chat interface with conversation history sidebar.

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ConversationSidebar } from "@/app/features/conversation/components/conversation-sidebar";
import { Navbar } from "@/components/navbar";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ConversationHandlersContext } from "@/app/features/conversation/hooks/useConversationHandlers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ChatLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // Use App Router navigation
  const [handlers, setHandlersState] = useState<{
    startNewConversation: () => string;
    loadConversation: (id: string) => Promise<void>;
  } | null>(null);

  // Stable setHandlers function to prevent infinite loops
  const setHandlers = useCallback((newHandlers: {
    startNewConversation: () => string;
    loadConversation: (id: string) => Promise<void>;
  } | null) => {
    setHandlersState(newHandlers);
  }, []);

  const handleNewConversation = () => {
    // Navigate to root to ensure fresh state
    if (handlers) {
      handlers.startNewConversation();
      router.push('/');
    }
  };

  const handleConversationSelect = async (conversationId: string) => {
    // Explicitly update URL if needed, but for now just load
    // We could add ?c=id to generic URL for deep linking support later
    if (handlers) {
      await handlers.loadConversation(conversationId);
    }
  };

  return (
    <ConversationHandlersContext.Provider value={{ setHandlers, handlers }}>
      <SidebarProvider>
        <ConversationSidebar
          onNewConversation={handleNewConversation}
          onConversationSelect={handleConversationSelect}
        />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ConversationHandlersContext.Provider>
  );
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatLayoutContent>{children}</ChatLayoutContent>
    </QueryClientProvider>
  );
}
