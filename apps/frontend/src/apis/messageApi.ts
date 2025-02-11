// src/api/messageApi.ts

import { baseUrl } from './index';
import type { ChatMessage } from '@/types/types';

/**
 * Message API:
 * Functions for message-related operations.
 */
export const messageApi = {
  /**
   * Retrieve chat messages for a given user.
   */
  getMessagesByUserId: async (userId: string): Promise<ChatMessage[]> => {
    const response = await fetch(`${baseUrl}/messages/get-by-user?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Save a chat message.
   */
  saveMessage: async (message: ChatMessage): Promise<void> => {
    const response = await fetch(`${baseUrl}/messages/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(`Error saving message: ${response.statusText}`);
    }
  },

  /**
   * Send a message to GPT and receive a response.
   */
  sendMessageToGPT: async (message: string): Promise<{ response: string }> => {
    const response = await fetch(`${baseUrl}/openai/send-to-gpt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  },
};