<template>
  <q-page padding>
    <section class="q-col-gutter-md row justify-between items-stretch">
      <div class="col-md-4 col-xs-12">
        <div class="row">
          <div class="col shadow-1 bg-white align-center justify-center">
            <q-img
              :src="variation?.images[0][0]"
              @click="imagePopup(0)"
              spinner-color="secondary"
              spinner-size="xs"
            />
            <div
              class="row q-col-gutter-md q-pa-md justify-between items-start"
            >
              <div
                class="col"
                v-for="(image, index) in variation?.images"
                :key="index"
              >
                <q-img
                  :src="image[0]"
                  @click="imagePopup(index)"
                  spinner-color="secondary"
                  spinner-size="xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-12">
        <div class="row full-height">
          <div class="col shadow-1 bg-white align-center justify-center"></div>
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
                v-show="loadingProductSpecs"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col shadow-1 bg-white align-center justify-center">
            <div class="product-desc q-pa-md" v-html="productDesc"></div>
            <div class="q-pa-md text-center">
              <q-spinner
                size="md"
                color="secondary"
                v-show="loadingProductDesc"
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
    <q-dialog v-model="toggleImagePopup">
      <q-carousel
        class="image-popup-carousel"
        animated
        v-model="imagePopupIndex"
        arrows
        navigation
        infinite
      >
        <q-carousel-slide
          v-for="(image, index) in variation?.images"
          :key="index"
          :name="index"
          :img-src="image[0]"
        />
      </q-carousel>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {
  getProductDesc,
  getProductSpecs,
  getVariation,
} from 'src/assets/functions';
import { Variation } from 'src/components/models';
import { defineComponent, onMounted, ref } from 'vue';
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
    const toggleImagePopup = ref<boolean>(false);
    const imagePopupIndex = ref<number>(0);
    const imagePopup = (index: number) => {
      imagePopupIndex.value = index;
      toggleImagePopup.value = true;
    };
    onMounted(() => {
      getVariation(props.id)
        .then((response) => {
          variation.value = response;
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
      imagePopup,
      toggleImagePopup,
      imagePopupIndex,
    };
  },
});
</script>
