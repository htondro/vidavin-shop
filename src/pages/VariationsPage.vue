<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'VariationsPage',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const variations = ref();
  },
});
</script>
