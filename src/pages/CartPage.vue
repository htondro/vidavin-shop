<template>
  <q-page padding>
    <section class="q-col-gutter-md row justify-between items-stretch">
      <div class="col-xs-12">
        <div class="row justify-end">
          <div class="col-xs-12 shadow-1 align-center justify-center q-my-xs">
            <div class="row q-pa-md">
              <div>{{ $t('cart') }}</div>
            </div>
            <q-separator />
            <div
              class="row q-pa-md justify-center align-center text-center q-col-gutter-md"
              v-if="!items.length"
            >
              <div class="col-xs-12">
                <q-icon
                  name="o_production_quantity_limits"
                  size="lg"
                  color="grey"
                />
              </div>
              <div class="col-xs-12">
                <div class="text-grey">
                  {{ $t('emptyCart') }}
                </div>
              </div>
              <div class="col-xs-12">
                <q-btn
                  color="secondary"
                  @click="$router.push({ name: 'Models' })"
                  >{{ $t('startShopping') }}</q-btn
                >
              </div>
            </div>
            <div class="row q-pa-md" v-else>
              <q-list class="col">
                <q-separator />
                <cart-variation-card
                  v-for="(item, index) in items"
                  :key="item.timestamp"
                  :cart-index="index"
                  :variation="item.variation"
                  :timestamp="item.timestamp"
                />
              </q-list>
            </div>
          </div>
          <div
            class="col-xs-12 shadow-1 align-center q-my-xs"
            v-if="items.length"
          >
            <div class="row q-pa-md justify-between items-baseline">
              <div class="col-shrink">
                <q-btn
                  color="positive"
                  :label="$t('checkout')"
                  @click="checkout"
                />
              </div>
              <div
                class="col-shrink text-positive"
                v-if="cartStore.getCartTotal"
              >
                <span class="q-px-xs text-grey">
                  {{ $t('cartTotal') }}
                </span>
                <span>
                  {{ cartStore.getCartTotal.toLocaleString('fa-IR') }}
                </span>
                <span class="q-px-xs">
                  {{ $t('currency') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { useCartStore } from 'src/stores/cart';
import { defineComponent } from 'vue';
import CartVariationCard from 'src/components/CartVariationCard.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'CartPage',
  components: { CartVariationCard },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const items = cartStore.getItems;
    const checkout = () => {
      router.push({ name: 'Checkout' });
    };
    return {
      cartStore,
      items,
      checkout,
    };
  },
});
</script>
