<template>
  <q-page padding>
    <section
      class="q-col-gutter-md row justify-between items-start"
      v-if="!loading"
    >
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
                    <product-card :product="model" />
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </transition-group>
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
import { defineComponent, ref, onMounted } from 'vue';
import { getCategories } from 'src/assets/functions';
import { Category } from 'src/components/models';
import ProductCard from 'src/components/ProductCard.vue';
export default defineComponent({
  name: 'CategoriesPage',
  components: { ProductCard },
  setup() {
    const categories = ref<Category[]>();
    const loading = ref(true);
    onMounted(() => {
      getCategories()
        .then((res) => {
          categories.value = res;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return { categories, loading };
  },
});
</script>
