<template>
  <q-card
    v-ripple
    class="q-hovarable cursor-pointer"
    @click="$router.push('/vp-' + product.id + '/' + product?.slug)"
  >
    <q-img :src="product?.image[0]" no-spinner class="bg-grey" />
    <q-card-section>
      <div class="text-center text-secondary">{{ product?.name }}</div>
    </q-card-section>
    <q-separator color="grey" />
    <q-card-section>
      <div class="text-center text-caption text-accent">
        {{ product.priceRange }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Model } from 'src/components/models';
export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Model>,
      required: true,
    },
  },
});
</script>
