import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { Variation } from 'src/components/models';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: ref(useLocalStorage('vidavin_cart', <Array<{
      timestamp: number,
      variation: Variation
    }>>[])),
  }),

  getters: {
    countItems(state) {
      return state.items.length;
    },
    getItems(state) {
      return state.items;
    },
    getCartTotal(state) {
      let total = 0;
      state.items.forEach(item => {
        total += item.variation.computedPrice
      });
      return total;
    }
  },

  actions: {
    addToCart(variation: Variation) {
      const timestamp = Date.now();
      this.items.push({ timestamp: timestamp, variation: variation });
    },
    removeItem(index: number) {
      this.items.splice(index, 1)
    },
    emptyCart() {
      this.items = [];
    },
    updateItemMeta(index: number, key: string, value: string | number | null) {
      this.items[index].variation.meta[key] = value;
    }
  }
});
