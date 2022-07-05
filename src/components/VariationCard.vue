<template>
  <q-card
    v-ripple
    class="q-hovarable cursor-pointer"
    @click="$router.push('/var-' + variation.id + '/' + variation.slug)"
  >
    <img :src="variation?.image1[0]" :alt="variation?.name" />
    <q-card-section>
      <div class="text-center text-secondary">{{ variation?.name }}</div>
    </q-card-section>
    <q-separator color="grey" />
    <template v-if="variation.price != 0">
      <q-card-section horizontal>
        <q-card-section>
          <q-icon name="o_sell" size="xs" color="accent" />
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <span class="q-px-xs text-accent">
            {{ variation.price.toLocaleString('fa-IR') }}
          </span>
          <span class="q-px-xs text-accent">
            {{ $t('currency') }}
          </span>
        </q-card-section>
      </q-card-section>
    </template>
    <template v-else>
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
