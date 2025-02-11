<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useMessageStore } from '@/stores/useMessage.store';
import { useUserProfileStore } from '@/stores/useProfile.store';
import ChatHistory from '@/components/ChatInterface/ChatHistory.vue';
import InputField from '@/components/ChatInterface/InputField.vue';

const inputValue = ref('');
const messageStore = useMessageStore();
const userStore = useUserProfileStore();

onMounted(() => {
  if (userStore.profile?.userId) {
    messageStore.fetchMessages(userStore.profile.userId);
  }
});

watch(
  () => userStore.profile,
  (newProfile) => {
    if (newProfile?.userId) {
      messageStore.fetchMessages(newProfile.userId);
    }
  }
);

const handleSendMessage = () => {
  if (!inputValue.value.trim() || !userStore.profile?.userId) return;
  messageStore.sendMessage(userStore.profile.userId, inputValue.value.trim());
  inputValue.value = '';
};
</script>

<template>
  <div class="chat-interface">
    <ChatHistory />
    <InputField 
      v-model="inputValue" 
      placeholder="Type a message..." 
      @send="handleSendMessage" 
    />
  </div>
</template>

<style scoped lang="less">
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.chat-interface > :first-child {
  flex: 1;
  overflow-y: auto;
  background: #f7f7f7;
  padding: 16px;
}

.chat-interface > :last-child {
  background: #fff;
  border-top: 1px solid #ccc;
  padding: 8px;
  flex-shrink: 0;
}
</style>