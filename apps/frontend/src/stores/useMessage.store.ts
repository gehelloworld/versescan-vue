// src/stores/useMessage.store.ts
import { defineStore } from 'pinia';
import { messageApi } from '@/apis/messageApi';
import { v4 as uuidv4 } from 'uuid';
import type { ChatMessage } from '@/types/types';

export const useMessageStore = defineStore('message', {
  state: () => ({
    chatMessages: [] as ChatMessage[],
    isFetching: false,
    isSending: false,
    error: null as string | null,
  }),
  actions: {
    /**
     * Fetch chat messages for a given user, sort them by timestamp,
     * and store them in state.
     */
    async fetchMessages(userId: string) {
      this.isFetching = true;
      this.error = null;
     
      try {
        const messages = await messageApi.getMessagesByUserId(userId);
        // Sort messages chronologically
        this.chatMessages = messages.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error fetching messages:', err);
      } finally {
        this.isFetching = false;
      }
    },

    /**
     * Save a message to DynamoDB, then forward it to GPT.
     * The bot's response is then added to DynamoDB.
     */
    async sendMessage(userId: string, messageText: string) {
      this.isSending = true;
      // Create a user message
      const userMessage: ChatMessage = {
        msgId: `msg-${uuidv4()}`,
        userId,
        sender: 'user',
        message: messageText,
        timestamp: new Date().toISOString(),
      };

      this.chatMessages.push(userMessage);

      // Save user message to DynamoDB
      try {
        await messageApi.saveMessage(userMessage);
      } catch (error) {
        console.error('Error saving user message:', error);
      }

        // Send message to GPT and handle bot response
        try {
          const { response } = await messageApi.sendMessageToGPT(messageText);
          const botMessage: ChatMessage = {
            msgId: `msg-${uuidv4()}`,
            userId,
            sender: 'bot',
            message: response,
            timestamp: new Date().toISOString(),
          };
         
          this.chatMessages.push(botMessage);
       
          // Save bot message to DynamoDB
          await messageApi.saveMessage(botMessage);
        } catch (error) {
          console.error('Error sending message to GPT:', error);

        } finally {
          this.isSending = false;
        }
      },
    },
  });