<template>
  <div class="col">
    <transition-group
      appear
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutLeft"
    >
      <div class="row q-py-sm" v-for="field in fields" :key="field.id">
        <div class="col">
          <q-input
            v-if="['text', 'number'].includes(field.model)"
            square
            outlined
            dense
            color="secondary"
            :label="field.label"
            :type="field.model"
            :hint="field.desc"
            :model-value="cartStore.items[cartIndex].variation.meta[field.id]"
            @update:model-value="
              (value) => cartStore.updateItemMeta(cartIndex, field.id, value)
            "
          />
          <template v-if="field.model == 'file'">
            <template
              v-if="cartStore.items[cartIndex].variation.meta[field.id]"
            >
              <template v-if="field.accepts == 'image/*'">
                <div class="col-xs-12 col-md-3">
                  <q-img
                    :src="
                      '/shopnew/uploads/' +
                      cartStore.items[cartIndex].variation.meta[field.id]
                    "
                    fit="cover"
                    style="width: 100%; height: auto; max-width: 300px"
                  >
                    <div
                      class="absolute-bottom text-caption row items-baseline justify-between"
                    >
                      <div>
                        {{ field.label }}
                      </div>
                      <q-btn
                        size="xs"
                        dense
                        round
                        flat
                        color="grey"
                        icon="close"
                        @click="
                          cartStore.updateItemMeta(cartIndex, field.id, '')
                        "
                      />
                    </div>
                  </q-img>
                </div>
              </template>
              <template v-else-if="field.accepts == 'audio/*'">
                audio player
              </template>
              <template v-else-if="field.accepts == 'video/*'">
                video player
              </template>
            </template>
            <template v-else>
              <q-uploader
                auto-upload
                url="https://vidavin.ir/shopnew/upload.php"
                :accept="field.accepts"
                :multiple="false"
                :headers="[
                  {
                    name: 'product-input-field-id',
                    value: field.id.toString(),
                  },
                  {
                    name: 'variation-index',
                    value: cartIndex.toString(),
                  },
                ]"
                :max-files="1"
                @uploaded="onUploaded"
                :label="field.label"
                :hide-upload-btn="true"
                color="secondary"
                square
                class="fit"
                style="max-width: 300px; height: auto"
              >
                <template v-slot:header="scope">
                  <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                    <q-spinner
                      v-if="scope.isUploading"
                      class="q-uploader__spinner"
                    />
                    <div class="col">
                      <div class="q-uploader__title">
                        {{ field.label }}
                      </div>
                    </div>
                    <q-btn
                      v-if="scope.canAddFiles"
                      type="a"
                      icon="add"
                      @click="scope.pickFiles"
                      color="primary"
                      text-color="secondary"
                      unelevated
                      size="xs"
                      dense
                    >
                      <q-uploader-add-trigger />
                      <q-tooltip>{{ $t('pickFiles') }}</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="scope.canUpload"
                      icon="cloud_upload"
                      @click="scope.upload"
                      round
                      dense
                      flat
                    >
                      <q-tooltip>{{ $t('uploadFiles') }}</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="scope.isUploading"
                      icon="clear"
                      @click="scope.abort"
                      round
                      dense
                      flat
                    >
                    </q-btn>
                  </div>
                </template>
                <template v-slot:list="scope">
                  <div
                    class="row"
                    v-for="file in scope.files"
                    :key="file.__key"
                  >
                    <div class="col-grow" v-if="file.__img" thumbnail>
                      <img
                        :src="file.__img.src"
                        fit="cover"
                        style="width: 100%; height: auto"
                      />
                      <q-btn
                        class="absolute-top-right q-ma-md"
                        size="xs"
                        dense
                        unelevated
                        text-color="negative"
                        color="primary"
                        icon="close"
                        @click="scope.removeFile(file)"
                      />
                    </div>
                  </div>
                </template>
              </q-uploader>
            </template>
          </template>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { useCartStore } from 'src/stores/cart';
import { defineComponent, PropType } from 'vue';
import { VariationField } from './models';
export default defineComponent({
  name: 'VariationFieldsForm',
  props: {
    fields: {
      type: Object as PropType<VariationField[]>,
      required: true,
    },
    cartIndex: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
});
</script>
