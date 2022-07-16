<template>
  <q-card
    v-ripple
    class="q-hovarable cursor-pointer"
    @click="$router.push('/var-' + variation.id + '/' + variation.slug)"
  >
    <q-img :src="variation?.images[0][0]" no-spinner class="bg-grey" />
    <q-card-section>
      <div class="text-center text-secondary">{{ variation?.name }}</div>
    </q-card-section>
    <q-separator color="grey" />
    <template v-if="variation.sellingPrice != 0 && variation.available">
      <q-card-section horizontal>
        <q-card-section class="self-center">
          <q-icon
            v-if="variation.discount"
            name="o_percent"
            size="xs"
            color="accent"
          />
          <q-icon v-else name="o_sell" size="xs" color="accent" />
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <div class="text-grey text-caption" v-if="variation.discount">
            <span class="q-px-xs text-strike">
              {{ variation.normalPrice.toLocaleString('fa-IR') }}
            </span>
          </div>
          <div class="text-accent">
            <span class="q-px-xs">
              {{ variation.sellingPrice.toLocaleString('fa-IR') }}
            </span>
            <span class="q-px-xs">
              {{ $t('currency') }}
            </span>
          </div>
        </q-card-section>
      </q-card-section>
    </template>
    <template v-else-if="!variation.priceIsComputed || !variation.available">
      <q-card-section class="text-grey text-center">
        {{ $t('outOfStock') }}
      </q-card-section>
    </template>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Variation } from './models';
export default defineComponent({
  name: 'VariationCard',
  props: {
    variation: {
      type: Object as PropType<Variation>,
      required: true,
    },
  },
  setup() {
    const getVariationLink = (slug: string) => {
      let slugParts: Array<string> = slug.split('-');
      let url = `/add-to-cart?vp=${slugParts[0]}&ptype=${slugParts[1]}&pvar=${slugParts[2]}`;
      return url;
    };
    return { getVariationLink };
  },
});
</script>
