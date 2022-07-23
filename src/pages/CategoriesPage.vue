<template>
  <q-page>
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      :autoplay="autoplay"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      id="main-carousel"
    >
      <q-carousel-slide
        class="cursor-pointer"
        @click="redirectBanner(banner)"
        style="background-size: cover"
        v-for="(banner, index) in banners"
        :key="index"
        :name="index"
        :img-src="banner.image[0]"
      />
    </q-carousel>
    <section class="row" v-if="!loading">
      <div class="col">
        <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="row" v-for="category in categories" :key="category.id">
            <div class="col q-pa-md">
              <div class="row">
                <div class="col-auto bg-primary q-pa-xs catalog-header">
                  <q-icon name="expand_more" color="secondary" size="md" />
                  <strong class="q-pr-md">{{ category.name }}</strong>
                </div>
              </div>
              <q-separator color="secondary" size="2px" />
              <div class="row">
                <transition-group
                  appear
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                >
                  <div
                    class="col-md-3 col-xs-6 q-pa-sm"
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
import { getBanners, getCategories } from 'src/assets/functions';
import { Banner, Category } from 'src/components/models';
import ProductCard from 'src/components/ProductCard.vue';
export default defineComponent({
  name: 'CategoriesPage',
  components: { ProductCard },
  setup() {
    const categories = ref<Category[]>();
    const banners = ref<Banner[]>([]);
    const slide = ref(0);
    const autoplay = ref(true);
    const loading = ref(true);
    const redirectBanner = (banner: Banner) => {
      window.location.href = banner.url;
    };
    onMounted(() => {
      getCategories()
        .then((res) => {
          categories.value = res;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
      getBanners('main_top').then((res) => {
        banners.value = res;
        loading.value = false;
      });
    });
    return { categories, banners, slide, autoplay, loading, redirectBanner };
  },
});
</script>
