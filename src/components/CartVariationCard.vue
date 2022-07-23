<template>
  <div class="col">
    <div class="row shadow-1 q-mt-md" style="position: relative; z-index: 1">
      <div class="col-xs-4 q-pa-xs">
        <q-img :src="variation.images[0][0]" color="grey" no-spinner />
      </div>
      <div class="col-xs-8">
        <div class="row">
          <div class="col-grow q-pa-xs">
            <div class="row">
              <div class="col-auto">
                <div>{{ variation.name }}</div>
                <q-separator inset class="product-card-separator" />
                <template v-if="variation.priceIsComputed">
                  <template v-if="computedPriceFunction(variation)">
                    <transition
                      appear
                      enter-active-class="animated zoomIn"
                      leave-active-class="animated zoomOut"
                    >
                      <div class="text-positive items-baseline fontsize-10">
                        <span>
                          {{
                            computedPriceFunction(variation).toLocaleString(
                              'fa-IR'
                            )
                          }}
                        </span>
                        <span class="q-px-xs fontsize-10">
                          {{ $t('currency') }}
                        </span>
                      </div>
                    </transition>
                  </template>
                  <template v-else-if="computedPriceFunction(variation) == 0">
                    <transition
                      appear
                      enter-active-class="animated zoomIn"
                      leave-active-class="animated zoomOut"
                    >
                      <div
                        class="text-caption text-grey fontsize-8"
                        v-html="$t('fillVariationFormHint')"
                      ></div>
                    </transition>
                  </template>
                </template>
                <template v-if="!variation.priceIsComputed">
                  <transition
                    appear
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut"
                  >
                    <div class="text-positive fontsize-10">
                      <span>{{
                        variation.sellingPrice.toLocaleString('fa-IR')
                      }}</span>
                      <span class="q-px-xs">{{ $t('currency') }}</span>
                    </div>
                  </transition>
                  <transition
                    appear
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut"
                  >
                    <div
                      class="text-grey text-strike fontsize-10"
                      v-if="variation.discount"
                    >
                      {{ variation.normalPrice.toLocaleString('fa-IR') }}
                    </div>
                  </transition>
                </template>
              </div>
            </div>
          </div>
          <q-space />
          <div class="col-shrink q-pa-xs">
            <div class="row justify-end">
              <q-btn
                icon="close"
                dense
                text-color="negative"
                unelevated
                color="primary"
                size="sm"
                @click="cartStore.removeItem(cartIndex)"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <br />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-end">
      <div class="col-10 shadow-1 bg-primary q-pa-xs variation-form">
        <div class="row">
          <div class="col">
            <div class="row q-pa-sm" v-if="loadingVariationForm">
              <div class="col">
                <q-spinner color="secondary" size="xs" />
              </div>
            </div>
            <div
              class="row cursor-pointer"
              v-else
              @click="toggleVariationForm = !toggleVariationForm"
            >
              <div class="col align-center" v-if="toggleVariationForm">
                <q-icon name="expand_more" color="secondary" size="md" />
                <span class="text-positive fontsize-10">
                  {{ $t('CartVariationCardFormExpanded') }}
                </span>
              </div>
              <div class="col align-center" v-else>
                <q-icon name="chevron_left" color="secondary" size="md" />
                <span
                  class="text-positive fontsize-9"
                  v-html="$t('CartVariationCardFormCollapsed')"
                ></span>
              </div>
            </div>
            <transition
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
            >
              <div class="row q-pa-sm" v-if="toggleVariationForm">
                <div class="col">
                  <div class="row">
                    <variation-fields-form
                      :cart-index="cartIndex"
                      :fields="fields"
                    />
                  </div>
                  <div class="row justify-end">
                    <div class="col-shrink">
                      <q-btn
                        color="positive"
                        @click="toggleVariationForm = !toggleVariationForm"
                        class="fontsize-10"
                        :label="$t('ConfirmVariationForm')"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getVariationFields } from 'src/assets/functions';
import { useCartStore } from 'src/stores/cart';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { Variation, VariationField } from './models';
import VariationFieldsForm from './VariationFieldsForm.vue';
export default defineComponent({
  name: 'CartVariationCard',
  components: { VariationFieldsForm },
  props: {
    variation: {
      type: Object as PropType<Variation>,
      required: true,
    },
    cartIndex: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();
    const fields = ref<VariationField[]>([]);
    const toggleVariationForm = ref<boolean>(false);
    const loadingVariationForm = ref<boolean>(true);
    const computedPriceFunction = eval(props.variation.computedPriceFunction);
    function onUploaded(info: {
      xhr: {
        response: string;
      };
    }) {
      if (JSON.parse(info.xhr.response)) {
        // : { uploaded: boolean; fieldId: string; fileName: string }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let res: {
          uploaded: boolean;
          fieldId: string;
          fileName: string;
          itemId: string;
        } = JSON.parse(info.xhr.response);
        let fieldId = res.fieldId;
        cartStore.updateItemMeta(props.cartIndex, fieldId, res.fileName);
      }
    }
    onMounted(() => {
      if (props.variation.fields.length) {
        getVariationFields(props.variation.fields)
          .then((response) => {
            fields.value = response;
            loadingVariationForm.value = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        loadingVariationForm.value = false;
      }
    });
    return {
      cartStore,
      fields,
      onUploaded,
      toggleVariationForm,
      loadingVariationForm,
      computedPriceFunction,
    };
  },
});
</script>

<style lang="scss" scoped>
.variation-form {
  transition: all 0.3s;
}
</style>
