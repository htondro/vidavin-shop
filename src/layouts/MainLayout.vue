<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated class="bg-white text-secondary">
      <section class="bg-primary text-grey">
        <div
          class="container q-pa-xs fontsize-10"
          :class="{ 'text-center': $q.platform.is.mobile }"
        >
          {{ $t('headerTopBar') }}
        </div>
      </section>
      <section class="row justify-center align-center q-pa-md">
        <img src="~assets/vidavin-logo-header.png" width="150" height="60" />
      </section>
      <q-separator />
      <section class="container row justify-between align-center q-pa-md">
        <div class="col-7">
          <div class="row">
            <div class="col-shrink full-height self-center q-pr-sm">
              <q-btn
                @click="toggleLeftDrawer"
                dense
                color="secondary"
                icon="o_grid_view"
                aria-label="Menu"
              />
            </div>
            <div
              class="col-xs-6 col-md-2 cursor-pointer"
              @click="toggleLeftDrawer"
            >
              {{ $t('menu') }}
            </div>
          </div>
        </div>
        <div class="col-auto">
          <q-btn
            color="positive"
            icon-right="shopping_cart"
            aria-label="Cart"
            unelevated
            @click="$router.push({ name: 'Cart' })"
            >{{ $t('cart') }}</q-btn
          >
        </div>
      </section>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      overlay
      :breakpoint="1400"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="container">
      <router-view> </router-view>
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <section class="container row justify-between align-center q-pa-md">
        <div class="col-md-3 col-xs-6 align-start justify-center">footer 1</div>
        <div class="col-md-3 col-xs-6 align-start justify-center">footer 2</div>
      </section>
      <section class="bg-secondary text-white">
        <div class="container row justify-center align-center">
          <div class="col-auto q-pa-xs">
            {{ $t('footerBottomBar', { year: new Date().getFullYear() }) }}
          </div>
        </div>
      </section>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
