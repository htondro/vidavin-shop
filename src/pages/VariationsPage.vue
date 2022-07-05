<template>
  <q-page padding>
    <section class="q-col-gutter-md row justify-between items-start">
      <div class="col-xs-12">
        <div class="row q-pa-md" v-if="variations?.length">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div class="col shadow-1 bg-white">
              <div class="row items-start justify-start q-pa-md">
                <strong>{{ product?.name }}</strong>
              </div>
              <q-separator color="grey" />
              <div
                class="row q-col-gutter-md items-start justify-start q-pa-md"
              >
                <transition-group
                  appear
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                >
                  <div
                    class="col-md-3 col-xs-12 q-pa-md"
                    v-for="variation in variations"
                    :key="variation.id"
                  >
                    <variation-card :variation="variation"></variation-card>
                  </div>
                </transition-group>
              </div>
            </div>
          </transition>
        </div>
        <q-inner-loading
          class="loading"
          :showing="loading"
          size="md"
          color="secondary"
        />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { getModel, getVariations } from 'src/assets/functions';
import { Model, Variation } from 'src/components/models';
import VariationCard from 'src/components/VariationCard.vue';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'VariationsPage',
  components: { VariationCard },
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
    const variations = ref<Variation[]>();
    const product = ref<Model>();
    const loading = ref(true);
    onMounted(() => {
      getModel(props.id)
        .then((response) => {
          product.value = response;
        })
        .catch((err) => {
          console.log(err);
        });
      getVariations(props.id)
        .then((response) => {
          variations.value = response;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return { product, variations, loading };
  },
});
</script>
