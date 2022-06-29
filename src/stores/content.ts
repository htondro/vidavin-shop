import { defineStore } from 'pinia';
import { Model } from 'src/components/models';

export const useContentStore = defineStore('content', {
  state: () => ({
    model: <Model>{}
  }),

  getters: {
    getModel(state) {
      return state.model;
    }
  },

  actions: {
    setModel(newModel: Model) {
      this.model = newModel;
    }
  }
});
