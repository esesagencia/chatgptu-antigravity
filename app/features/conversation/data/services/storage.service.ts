// ABOUTME: Service layer for managing conversation storage in browser sessionStorage
// ABOUTME: Provides abstraction over sessionStorage operations for conversation persistence

/**
 * Storage service for managing conversation data in browser storage
 * Abstracts localStorage operations and provides type-safe access
 */
export class ConversationStorageService {
  private static readonly CONVERSATION_ID_KEY = 'conversationId';
  private static readonly CONVERSATION_HISTORY_KEY = 'conversationHistory';
  private static readonly OWNED_CONVERSATIONS_KEY = 'ownedConversations';

  /**
   * Check if we're in a browser environment
   */
  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  /**
   * Generate a unique conversation ID
   */
  static generateConversationId(): string {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 11);
    const id = `conv-${timestamp}-${randomSuffix}`;
    this.addOwnedConversation(id);
    return id;
  }

  /**
   * Get the stored conversation ID from localStorage
   */
  static getConversationId(): string | null {
    if (!this.isBrowser()) return null;

    try {
      return localStorage.getItem(this.CONVERSATION_ID_KEY);
    } catch (error) {
      console.error('Failed to get conversation ID from storage:', error);
      return null;
    }
  }

  /**
   * Store a conversation ID in localStorage
   */
  static setConversationId(id: string): boolean {
    if (!this.isBrowser()) return false;

    try {
      localStorage.setItem(this.CONVERSATION_ID_KEY, id);
      this.addOwnedConversation(id);
      return true;
    } catch (error) {
      console.error('Failed to set conversation ID in storage:', error);
      return false;
    }
  }

  /**
   * Add a conversation ID to the list of owned conversations
   */
  static addOwnedConversation(id: string): void {
    if (!this.isBrowser() || !id) return;

    try {
      const owned = this.getOwnedConversations();
      if (!owned.includes(id)) {
        owned.push(id);
        localStorage.setItem(this.OWNED_CONVERSATIONS_KEY, JSON.stringify(owned));
      }
    } catch (error) {
      console.error('Failed to add owned conversation:', error);
    }
  }

  /**
   * Get the list of conversation IDs owned by this browser
   */
  static getOwnedConversations(): string[] {
    if (!this.isBrowser()) return [];

    try {
      const data = localStorage.getItem(this.OWNED_CONVERSATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get owned conversations:', error);
      return [];
    }
  }

  /**
   * Get or create a conversation ID
   * If no ID exists in storage, generates a new one and stores it
   */
  static getOrCreateConversationId(): string {
    let conversationId = this.getConversationId();

    if (!conversationId) {
      conversationId = this.generateConversationId();
      this.setConversationId(conversationId);
      console.log('Created new conversation ID:', conversationId);
    } else {
      console.log('Using existing conversation ID:', conversationId);
    }

    return conversationId;
  }

  /**
   * Clear the current conversation ID from storage
   */
  static clearConversationId(): boolean {
    if (!this.isBrowser()) return false;

    try {
      localStorage.removeItem(this.CONVERSATION_ID_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear conversation ID from storage:', error);
      return false;
    }
  }

  /**
   * Store conversation metadata
   */
  static setConversationMetadata(conversationId: string, metadata: Record<string, any>): boolean {
    if (!this.isBrowser()) return false;

    try {
      const key = `${this.CONVERSATION_HISTORY_KEY}_${conversationId}`;
      localStorage.setItem(key, JSON.stringify(metadata));
      return true;
    } catch (error) {
      console.error('Failed to store conversation metadata:', error);
      return false;
    }
  }

  /**
   * Get conversation metadata
   */
  static getConversationMetadata(conversationId: string): Record<string, any> | null {
    if (!this.isBrowser()) return null;

    try {
      const key = `${this.CONVERSATION_HISTORY_KEY}_${conversationId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get conversation metadata:', error);
      return null;
    }
  }
}