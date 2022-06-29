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
                    <router-link :to="'#'">
                      <q-img
                        :src="variation.image1[0]"
                        :alt="variation.name"
                        :width="variation.image1[1]"
                        :height="variation.image1[2]"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center">
                          {{ variation.name }}
                        </div>
                      </q-img>
                    </router-link>
                  </div>
                </transition-group>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { getModel, getVariations } from 'src/assets/functions';
import { Model, Variation } from 'src/components/models';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'VariationsPage',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const variations = ref<Variation[]>();
    const product = ref<Model>();
    const $q = useQuasar();
    onMounted(() => {
      $q.loading.show();
      getModel(props.slug)
        .then((response) => {
          product.value = response;
          getVariations(props.slug)
            .then((response) => {
              variations.value = response;
              console.log(product.value);
              $q.loading.hide();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return { product, variations };
  },
});
</script>
