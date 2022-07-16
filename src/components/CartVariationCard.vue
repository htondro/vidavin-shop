<template>
  <transition
    apear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
    :key="timestamp"
  >
    <q-item class="q-my-md">
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="variation.images[0][0]" color="grey" no-spinner />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{ variation.name }}</q-item-label>
        <q-item-label caption>
          <template v-if="variation.priceIsComputed">
            <template v-if="computedPriceFunction(variation)">
              <div class="text-secondary items-baseline">
                <span>
                  {{ computedPriceFunction(variation).toLocaleString('fa-IR') }}
                </span>
                <span class="q-px-xs">
                  {{ $t('currency') }}
                </span>
              </div>
            </template>
            <template v-else-if="computedPriceFunction(variation) == 0">
              <div class="text-caption text-grey">
                {{ $t('fillVariationFormHint') }}
              </div>
            </template>
          </template>
          <template v-else-if="!variation.priceIsComputed">
            <div class="text-grey text-strike" v-if="variation.discount">
              {{ variation.normalPrice.toLocaleString('fa-IR') }}
            </div>
            <div class="text-secondary">
              <span>{{ variation.sellingPrice.toLocaleString('fa-IR') }}</span>
              <span class="q-px-xs">{{ $t('currency') }}</span>
            </div>
          </template>
        </q-item-label>
      </q-item-section>
      <q-item-section side class="q-mx-xs">
        <q-btn
          color="info"
          size="sm"
          :loading="loadingVariationForm"
          @click="toggleVariationForm = !toggleVariationForm"
          ><span>{{ $t('variationFormFields') }}</span></q-btn
        >
      </q-item-section>
      <q-btn
        icon="close"
        class="absolute-top-right"
        flat
        dense
        color="grey"
        size="xs"
        @click="cartStore.removeItem(cartIndex)"
      />
    </q-item>
  </transition>
  <q-item v-if="toggleVariationForm">
    <variation-fields-form :cart-index="cartIndex" :fields="fields" />
  </q-item>
  <q-separator />
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
