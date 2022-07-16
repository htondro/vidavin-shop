<template>
  <q-page padding>
    <section class="q-col-gutter-md row">
      <div class="col-xs-12">
        <div class="row justify-end">
          <div class="col-xs-12 shadow-1 align-center justify-center q-my-xs">
            <div class="row q-pa-md">
              <div>{{ $t('checkout') }}</div>
            </div>
            <q-separator />
            <div class="row q-pa-md justify-start align-center q-col-gutter-md">
              <div class="col-xs-12">
                <div class="row q-pa-md text-secondary">
                  {{ $t('yourInfo') }}
                </div>
                <q-separator inset />
                <div class="row q-pa-md q-col-gutter-md">
                  <div class="col-xs-6 col-md-3">
                    <q-input
                      square
                      color="secondary"
                      v-model.trim="customerStore.customer.firstName"
                      type="text"
                      :label="$t('firstName')"
                      :rules="requiredRule"
                    />
                  </div>
                  <div class="col-xs-6 col-md-3">
                    <q-input
                      square
                      color="secondary"
                      v-model.trim="customerStore.customer.lastName"
                      type="text"
                      :label="$t('lastName')"
                      :rules="requiredRule"
                    />
                  </div>
                </div>
                <div class="row q-pa-md q-col-gutter-md">
                  <div class="col-xs-12 col-md-3">
                    <q-input
                      square
                      color="secondary"
                      v-model.trim="customerStore.customer.email"
                      type="text"
                      :label="$t('email')"
                      :hint="$t('optionalField')"
                    />
                  </div>
                  <div class="col-xs-6 col-md-3">
                    <q-input
                      style="direction: ltr"
                      square
                      color="secondary"
                      v-model.number="customerStore.customer.username"
                      type="tel"
                      :label="$t('phone')"
                      unmasked-value
                      mask="(###) ### - ####"
                      :rules="requiredRule"
                    />
                  </div>
                </div>
                <div class="row q-pa-md text-secondary">
                  {{ $t('shippingInfo') }}
                </div>
                <q-separator inset />
                <div class="row q-pa-md col-gutter-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { useCustomerStore } from 'src/stores/customer';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'CheckoutPage',
  setup() {
    const customerStore = useCustomerStore();
    const { t } = useI18n();
    const requiredRule = [
      (val: string | number) => !!val || t('requiredField'),
    ];
    return { customerStore, requiredRule };
  },
});
</script>
