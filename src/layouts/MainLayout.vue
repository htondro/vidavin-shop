<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated class="bg-white text-secondary">
      <section class="bg-secondary text-primary">
        <div class="container q-pa-xs">{{ $t('headerTopBar') }}</div>
      </section>
      <section class="row justify-center align-center q-pa-md">
        <img src="~assets/vidavin-logo-header.png" width="150" height="60" />
      </section>
      <q-separator />
      <section class="container row justify-between align-center q-pa-xs">
        <div class="col-auto">
          <q-btn flat icon="menu" aria-label="Menu" @click="toggleLeftDrawer">{{
            $t('menu')
          }}</q-btn>
        </div>
        <div class="col-auto">
          <q-btn flat icon="o_shopping_cart" aria-label="Cart">{{
            $t('cart')
          }}</q-btn>
        </div>
      </section>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      overlay
      breakpoint="1400"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="container">
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <section class="container row justify-between align-center q-pa-md">
        <div class="col-md-3 col-xs-6 align-start justify-center">footer 1</div>
        <div class="col-md-3 col-xs-6 align-start justify-center">footer 2</div>
        <div class="col-md-3 col-xs-6 align-start justify-center">footer 3</div>
        <div class="col-md-3 col-xs-6 align-start justify-center">footer 4</div>
      </section>
      <section class="bg-dark text-white">
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
