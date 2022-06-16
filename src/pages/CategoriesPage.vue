<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getCategories } from 'src/assets/functions';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'CategoriesPage',
  setup() {
    const categories = ref();
    const { locale } = useI18n({ useScope: 'global' });
    onMounted(() => {
      getCategories(locale.value)
        .then((res) => {
          categories.value = res;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
});
</script>
