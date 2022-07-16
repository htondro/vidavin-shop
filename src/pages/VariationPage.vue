<template>
  <q-page padding class="q-col-gutter-md">
    <section
      class="q-col-gutter-md row justify-between items-stretch"
      v-if="!loading"
    >
      <div class="col-md-4 col-xs-12">
        <div class="row">
          <div class="col shadow-1 bg-white align-center justify-center">
            <transition
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
            >
              <q-img :src="selectedImage[0]" no-spinner class="bg-grey" />
            </transition>
            <div
              class="row q-col-gutter-md q-pa-md justify-between items-start"
            >
              <transition-group
                appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut"
              >
                <div
                  class="col"
                  v-for="(image, index) in variation?.images"
                  :key="index"
                >
                  <q-img
                    :src="image[0]"
                    @click="selectImage(index)"
                    no-spinner
                    class="bg-grey cursor-pointer"
                  />
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-12">
        <div
          class="row full-height shadow-1 bg-white aling-start justify-center"
        >
          <div class="col-xs-12 col-md-7 self-start q-pa-md">
            <div
              class="row text-h6"
              :class="{ 'justify-center': $q.platform.is.mobile }"
            >
              {{ variation?.name }}
            </div>
            <div
              class="row text-grey small"
              :class="{ 'justify-center': $q.platform.is.mobile }"
            >
              {{ variation?.subtitle }}
            </div>
          </div>
          <div class="col-xs-12 col-md-5 q-pa-md self-start">
            <div class="row">
              <transition-group
                appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut"
              >
                <div
                  class="col-xs-12"
                  v-if="variation?.priceIsComputed && variation.available"
                >
                  <div
                    class="row items-baseline text-secondary"
                    :class="{
                      'justify-center': $q.platform.is.mobile,
                      'justify-end': !$q.platform.is.mobile,
                    }"
                  >
                    <div class="text-bold text-caption">
                      {{ variation?.modelPriceRange }}
                    </div>
                  </div>
                </div>
                <div
                  class="col-xs-12"
                  v-else-if="
                    !variation?.priceIsComputed && variation?.available
                  "
                >
                  <div
                    class="row text-grey text-strike text-h6"
                    :class="{
                      'justify-center': $q.platform.is.mobile,
                      'justify-end': !$q.platform.is.mobile,
                    }"
                    v-if="variation?.discount"
                  >
                    {{ variation?.normalPrice.toLocaleString('fa-IR') }}
                  </div>
                  <div
                    class="row items-baseline text-secondary"
                    :class="{
                      'justify-center': $q.platform.is.mobile,
                      'justify-end': !$q.platform.is.mobile,
                    }"
                  >
                    <div class="text-bold text-h4">
                      {{ variation?.sellingPrice.toLocaleString('fa-IR') }}
                    </div>
                    <div class="text-caption">
                      {{ $t('currency') }}
                    </div>
                  </div>
                </div>
                <div class="col-xs-12" v-else-if="!variation?.available">
                  <div
                    class="row items-baseline text-grey"
                    :class="{
                      'justify-center': $q.platform.is.mobile,
                      'justify-end': !$q.platform.is.mobile,
                    }"
                  >
                    {{ $t('outOfStock') }}
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
          <div class="col-xs-12 q-pa-md self-end q-col-gutter-md">
            <div
              class="row"
              :class="{
                'justify-center': $q.platform.is.mobile,
                'justify-end': !$q.platform.is.mobile,
              }"
            >
              <div class="col-xs-10 col-md-4">
                <transition
                  around
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                >
                  <q-btn
                    class="full-width"
                    style="min-height: 50px"
                    color="positive"
                    icon="add_shopping_cart"
                    :label="$t('addToCart')"
                    @click="addToCart(variation)"
                    :disable="!variation?.available"
                  />
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="q-col-gutter-md row justify-between items-start">
      <div class="col-xs-12">
        <div class="row">
          <div class="col shadow-1 bg-white align-center justify-center">
            <div class="product-specs q-pa-md" v-html="productSpecs"></div>
            <div class="q-pa-md text-center">
              <q-spinner
                size="md"
                color="secondary"
                v-show="loadingProductSpecs && !loading"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col shadow-1 bg-white align-center justify-center">
            <article
              class="product-desc q-pa-md"
              v-html="productDesc"
            ></article>
            <div class="q-pa-md text-center">
              <q-spinner
                size="md"
                color="secondary"
                v-show="loadingProductDesc && !loading"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <q-inner-loading
      class="loading"
      :showing="loading"
      size="md"
      color="secondary"
    />
  </q-page>
</template>

<script lang="ts">
import {
  getProductDesc,
  getProductSpecs,
  getVariation,
} from 'src/assets/functions';
import { Variation } from 'src/components/models';
import { useCartStore } from 'src/stores/cart';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'VariationPage',
  props: {
    slug: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const variation = ref<Variation>();
    const productDesc = ref<string>();
    const productSpecs = ref<string>();
    const loading = ref<boolean>(true);
    const loadingProductDesc = ref<boolean>(true);
    const loadingProductSpecs = ref<boolean>(true);
    const selectedImage = ref();
    const selectImage = (index: number) => {
      selectedImage.value = variation.value?.images[index];
    };
    const variationFields = ref();
    const loadingVariationFields = ref(true);
    const cartStore = useCartStore();
    const router = useRouter();
    const addToCart = (variation: Variation | undefined) => {
      loading.value = true;
      if (variation) {
        cartStore.addToCart(variation);
        router.push({ name: 'Cart' });
      }
    };
    onMounted(() => {
      getVariation(props.id)
        .then((response) => {
          variation.value = response;
          selectedImage.value = variation.value.images[0];
          loading.value = false;
          getProductDesc(variation.value.wcid)
            .then((response) => {
              productDesc.value = response;
              loadingProductDesc.value = false;
            })
            .catch((err) => {
              console.log(err);
            });
          getProductSpecs(variation.value.wcid)
            .then((response) => {
              productSpecs.value = response;
              loadingProductSpecs.value = false;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      variation,
      loading,
      productDesc,
      loadingProductDesc,
      productSpecs,
      loadingProductSpecs,
      selectedImage,
      selectImage,
      variationFields,
      loadingVariationFields,
      addToCart,
    };
  },
});
</script>
