<template>
  <q-page padding>
    <section class="q-col-gutter-md row justify-between items-start">
      <div class="col-xs-12">
        <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div
            class="row q-pa-md"
            v-for="category in categories"
            :key="category.id"
          >
            <div class="col shadow-1 bg-white">
              <div class="row items-start justify-start q-pa-md">
                <strong>{{ category.name }}</strong>
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
                    v-for="model in category.models"
                    :key="model.id"
                  >
                    <router-link :to="'/vp/' + model.slug">
                      <q-img
                        :src="model.image[0]"
                        :alt="model.name"
                        :width="model.image[1]"
                        :height="model.image[2]"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center">
                          {{ model.name }}
                        </div>
                      </q-img>
                    </router-link>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getCategories } from 'src/assets/functions';
import { Category } from 'src/components/models';
import { useQuasar } from 'quasar';
export default defineComponent({
  name: 'CategoriesPage',
  setup() {
    const categories = ref<Category[]>();
    const $q = useQuasar();
    onMounted(() => {
      $q.loading.show();
      getCategories()
        .then((res) => {
          categories.value = res;
          $q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return { categories };
  },
});
</script>
