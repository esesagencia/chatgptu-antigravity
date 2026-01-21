"use client";

import { reflexiveConversations } from "@/src/data/reflexive-conversations";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ConversationSidebarProps {
  onNewConversation: () => void;
  onConversationSelect: (conversationId: string) => void;
}

export function ConversationSidebar({
  onNewConversation,
  onConversationSelect,
}: ConversationSidebarProps) {

  return (
    <Sidebar>
      {/* Header with New Chat button */}
      <SidebarHeader className="p-4">
        <Button
          onClick={onNewConversation}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Conversación
        </Button>

        <div className="pt-4 pb-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Últimas reflexiones
          </h3>
        </div>
        <Separator className="my-2" />
      </SidebarHeader>

      {/* Static Conversation list */}
      <SidebarContent className="px-2">
        <div className="space-y-1">
          {reflexiveConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onConversationSelect(conv.id)}
              className="w-full text-left p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group flex flex-col gap-1 border border-transparent hover:border-border/40"
            >
              <div className="flex items-center gap-2 font-medium text-sm">
                <MessageSquare className="w-4 h-4 opacity-70" />
                {conv.title}
              </div>
              <div className="text-xs text-muted-foreground pl-6 line-clamp-1 opacity-80 group-hover:opacity-100">
                {conv.pillar}
              </div>
            </button>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground text-center opacity-50">
          v2.2 • ChatGPTú
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
