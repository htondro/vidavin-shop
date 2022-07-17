<template>
  <q-card
    v-ripple
    class="q-hovarable cursor-pointer"
    @click="$router.push('/vp-' + product.id + '/' + product?.slug)"
  >
    <q-img :src="product?.image[0]" no-spinner class="bg-grey" />
    <q-card-section class="q-pa-sm justify-start row">
      <div class="col-auto">
        <div>{{ product?.name }}</div>
        <q-separator inset class="product-card-separator" />
        <div class="text-caption text-positive">
          <span style="font-size: xx-small">{{
            product.priceRange.split(' ', 1)[0]
          }}</span>
          <span class="text-bold q-px-xs" style="font-size: small">{{
            product.priceRange.split(' ', 2)[1]
          }}</span>
          <span style="font-size: xx-small">{{
            product.priceRange.split(' ').splice(2).join(' ')
          }}</span>
        </div>
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
