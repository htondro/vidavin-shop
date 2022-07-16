<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useCartStore } from './stores/cart';
import { useUserStore } from './stores/user';

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    window.addEventListener('unload', () => {
      userStore.setLastSeen();
    });
    onMounted(() => {
      // if user last seen more than 2 hours ago
      if (userStore.getLastSeenDiff.hours > 2) {
        cartStore.emptyCart();
      }
    });
  },
});
</script>
