<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useMessageStore } from '@/stores/useMessage.store';
import ScrollButton from '@/components/ui/ScrollButton.component.vue';

const messageStore = useMessageStore();

const chatContainer = ref<HTMLElement | null>(null);
const messagesEndRef = ref<HTMLElement | null>(null);
const showScrollButton = ref(false);
const initialLoad = ref(true);

const scrollToBottom = (): void => {
  messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' });
  showScrollButton.value = false;
};

const SCROLL_BOTTOM_DISTANCE = 20;

const handleScroll = (): void => {
  if (!chatContainer.value) return;
  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
  // Show the scroll button if the user is more than 20px away from the bottom
  showScrollButton.value = scrollTop + clientHeight < scrollHeight - SCROLL_BOTTOM_DISTANCE;
};

onMounted(() => {
  chatContainer.value?.addEventListener('scroll', handleScroll);
  // Scroll to bottom on initial load if there are messages
  nextTick(() => {
    if (messageStore.chatMessages.length > 0) {
      scrollToBottom();
      initialLoad.value = false;
    }
  });
});

onUnmounted(() => {
  chatContainer.value?.removeEventListener('scroll', handleScroll);
});

// Watch for changes in chatMessages and auto-scroll on initial load
watch(() => messageStore.chatMessages, (newMessages) => {
  if (newMessages.length > 0) {
    // On initial load, scroll unconditionally
    if (initialLoad.value) {
      nextTick(() => {
        scrollToBottom();
        initialLoad.value = false;
      });
    } 
    else if (chatContainer.value) {
      // Scroll to bottom if the user is already near the bottom
      const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
      if (scrollHeight - scrollTop - clientHeight <= SCROLL_BOTTOM_DISTANCE) {
        scrollToBottom();
      }
    }
  }
});
</script>

<template>
  <div class="chat-history-wrapper" ref="chatContainer">
    <div class="chat-history column-flex">
      <div
        v-for="msg in messageStore.chatMessages"
        :key="msg.msgId"
        class="message"
        :class="msg.sender === 'user' ? 'user-message' : 'bot-message'"
      >
        {{ msg.message }}
      </div>
      <!-- Display the "Thinking..." cue when the bot is processing a response -->
      <div v-if="messageStore.isSending" class="message bot-message thinking">
        Thinking...
      </div>
      <div ref="messagesEndRef"></div>
    </div>
    <!-- Scroll to Bottom Button positioned at the lower middle of the wrapper -->
    <ScrollButton :visible="showScrollButton" @click="scrollToBottom" />
  </div>
</template>

<style scoped lang="less">
.chat-history-wrapper {
  position: relative;
  flex: 1;
  overflow-y: auto;
  background: #f7f7f7;
  padding: 16px;
}

.chat-history {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: flex-start;
}

.user-message {
  align-self: flex-end;
  background-color: #1483f9;
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
  word-wrap: break-word;
}

.bot-message {
  align-self: flex-start;
  background-color: #e3f8e3;
  color: #333;
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
  word-wrap: break-word;
}

.message {
  font-size: @font-size-medium;
  border-radius: 8px;
  max-width: 70%;
  word-wrap: break-word;
  padding: 8px;

  @media (max-width: 767px) {
    font-size: @font-size-base;
  }
}

.thinking {
  background-color: #bbbeb8;
}

.scroll-button {
  position: fixed;
  bottom: 15rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  background-color: #99bef8;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>