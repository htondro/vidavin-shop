<template>
  <q-page padding>
    <section class="row">
      <div class="col">
        <div class="row q-pa-md">
          <div class="col">
            <div class="row">
              <div class="col-auto bg-primary q-pa-xs catalog-header">
                <q-icon name="expand_more" color="secondary" size="md" />
                <strong class="q-pr-md">{{ $t('cart') }}</strong>
              </div>
            </div>
            <q-separator color="secondary" size="2px" />
            <div class="row" v-if="!items.length">
              <div class="col">
                <div class="row justify-center q-pt-md">
                  <q-icon
                    name="o_production_quantity_limits"
                    size="lg"
                    color="grey"
                  />
                </div>
                <div class="row justify-center q-pt-md">
                  <div class="text-grey">
                    {{ $t('emptyCart') }}
                  </div>
                </div>
                <div class="row justify-center q-pt-md">
                  <q-btn
                    color="secondary"
                    @click="$router.push({ name: 'Models' })"
                    >{{ $t('startShopping') }}</q-btn
                  >
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col">
                <transition-group
                  appear
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                >
                  <div
                    v-for="(item, index) in items"
                    :key="item.timestamp"
                    class="row"
                  >
                    <cart-variation-card
                      :cart-index="index"
                      :variation="item.variation"
                      :timestamp="item.timestamp"
                    />
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </div>
        <transition
          appear
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <div class="row q-pa-md" v-if="cartStore.getCartTotal">
            <div class="col">
              <div class="row">
                <div class="col-auto bg-primary q-pa-xs catalog-header">
                  <q-icon name="expand_more" color="secondary" size="md" />
                  <strong class="q-pr-md">{{ $t('cartSum') }}</strong>
                </div>
              </div>
              <q-separator color="secondary" size="2px" />
              <div class="row q-py-sm">
                <div class="col bg-primary">
                  <div class="row q-pa-md items-stretch justify-between">
                    <div class="col-auto align-center">
                      <div class="row fontsize-10">
                        {{
                          $t('cartLength', {
                            quantity: items.length.toLocaleString('fa-IR'),
                          })
                        }}
                      </div>
                      <div class="row text-bold">
                        <span>{{
                          cartStore.getCartTotal.toLocaleString('fa-IR')
                        }}</span>
                        <span class="q-px-xs">{{ $t('currency') }}</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <q-btn
                        :label="$t('checkoutButton')"
                        class="fontsize-10 full-height q-px-sm self-end"
                        dense
                        color="positive"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <div class="row q-pa-md" v-if="related.length">
          <div class="col">
            <div class="row">
              <div class="col-auto bg-primary q-pa-xs catalog-header">
                <q-icon name="expand_more" color="secondary" size="md" />
                <strong class="q-pr-md fontsize-10">{{
                  $t('cartRelated')
                }}</strong>
              </div>
            </div>
            <q-separator color="secondary" size="2px" />
            <div class="row">
              <div class="col">
                <transition-group
                  appear
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                >
                  <div v-for="id in related" :key="id" class="row">
                    <cart-related-card
                      @add-to-cart="addToCart"
                      :variation-id="id"
                    />
                  </div>
                </transition-group>
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
import { computed, defineComponent, ref } from 'vue';
import CartVariationCard from 'src/components/CartVariationCard.vue';
import CartRelatedCard from 'src/components/CartRelatedCard.vue';
import { useRouter } from 'vue-router';
import { Variation } from 'src/components/models';
export default defineComponent({
  name: 'CartPage',
  components: { CartVariationCard, CartRelatedCard },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const items = computed(() => cartStore.getItems);
    const related = computed(() => cartStore.getCommonRelatedVariations);
    const checkout = () => {
      router.push({ name: 'Checkout' });
    };
    function addToCart(variation: Variation) {
      cartStore.addToCart(variation);
    }
    return {
      cartStore,
      items,
      checkout,
      addToCart,
      related,
    };
  },
});
</script>
