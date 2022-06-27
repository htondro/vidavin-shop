<template>
  <q-layout view="lHh lpR fff">
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
          <q-btn flat icon="shopping_bag" aria-label="Cart">{{
            $t('cart')
          }}</q-btn>
        </div>
      </section>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <section class="container row justify-between align-center q-pa-md">
        <div class="col-md-3 col-xs-6">footer 1</div>
        <div class="col-md-3 col-xs-6">footer 2</div>
        <div class="col-md-3 col-xs-6">footer 3</div>
        <div class="col-md-3 col-xs-6">footer 4</div>
      </section>
      <section class="bg-dark text-white">
        <div class="container row justify-center align-center">
          <div class="col-auto q-pa-xs">{{ $t('footerBottomBar') }}</div>
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
