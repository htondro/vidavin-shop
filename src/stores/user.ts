import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';
const now = new Date();
export const useUserStore = defineStore('user', {
  state: () => ({
    lastSeen: ref(useLocalStorage('lastSeen', now)),
  }),

  getters: {
    getLastSeen(state) {
      return state.lastSeen;
    },
    getLastSeenDiff(state) {
      const now = new Date();
      const timeDiff = now.getTime() - state.lastSeen.getTime();
      const diffObj = {
        seconds: Math.floor(timeDiff / 1000),
        minutes: Math.floor(timeDiff / 1000 / 60),
        hours: Math.floor(timeDiff / 1000 / 60 / 60),
      }
      return diffObj;
    }
  },

  actions: {
    setLastSeen() {
      this.lastSeen = new Date();
    }
  }
});
