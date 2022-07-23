<template>
  <div class="col">
    <div class="row shadow-1 q-mt-xs" v-if="variation">
      <div class="col-xs-4 q-pa-xs">
        <q-img :src="variation?.images[0][0]" color="grey" no-spinner />
      </div>
      <div class="col-xs-8">
        <div class="row">
          <div class="col-xs-12 q-pa-xs">
            <div class="row">
              <div class="col-auto">
                <div>{{ variation?.name }}</div>
                <q-separator inset class="product-card-separator" />
                <template v-if="!variation?.priceIsComputed">
                  <transition
                    appear
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut"
                  >
                    <div
                      class="text-negative text-strike fontsize-10"
                      v-if="variation?.discount"
                    >
                      <span>{{
                        variation?.normalPrice.toLocaleString('fa-IR')
                      }}</span>
                      <span class="q-px-xs">{{ $t('currency') }}</span>
                    </div>
                  </transition>
                  <transition
                    appear
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut"
                  >
                    <div class="text-positive fontsize-11">
                      <span>{{ $t('forYou') }}</span>
                      <span class="q-px-xs">{{
                        variation?.sellingPrice.toLocaleString('fa-IR')
                      }}</span>
                      <span class="q-px-xs">{{ $t('currency') }}</span>
                    </div>
                  </transition>
                </template>
              </div>
            </div>
            <div class="row justify-start q-col-gutter-xs">
              <div class="col-xs-6 col-md-3">
                <q-btn
                  color="primary"
                  dense
                  class="fontsize-9 full-width"
                  text-color="dark"
                  unelevated
                  :label="$t('variationInfo')"
                  @click="
                    $router.push({
                      name: 'Variation',
                      params: { id: variation?.id, slug: variation?.slug },
                    })
                  "
                />
              </div>
              <div class="col-xs-6 col-md-3">
                <q-btn
                  color="positive"
                  dense
                  unelevated
                  class="fontsize-9 full-width"
                  :label="$t('addRelatedToCart')"
                  @click="$emit('addToCart', variation)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row justify-center align-center shadow-1 q-mt-xs q-pa-md"
      v-else
    >
      <q-spinner color="secondary" size="md" />
    </div>
  </div>
</template>

<script lang="ts">
import { getVariation } from 'src/assets/functions';
import { defineComponent, ref, onMounted } from 'vue';
import { Variation } from './models';
export default defineComponent({
  name: 'RelatedCard',
  props: {
    variationId: {
      type: String,
      required: true,
    },
  },
  emits: ['addToCart'],
  setup(props) {
    const variation = ref<Variation>();
    onMounted(() => {
      getVariation(props.variationId)
        .then((res) => {
          variation.value = res;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return { variation };
  },
});
</script>
