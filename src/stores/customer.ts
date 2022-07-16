import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Customer } from 'src/components/models';
import { ref } from 'vue';

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customer: ref(useLocalStorage('vidavin_customer', <Customer>{})),
  }),

  getters: {

  },

  actions: {
    async getCustomerData(phone: number) {
      const res: { data: Customer } = await api.post('shop/customer', { action: 'getCustomerData', data: { phone: phone } });
      this.customer = res.data;
    }
  }
});
