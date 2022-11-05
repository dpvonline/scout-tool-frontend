<!--
  not further developed, password reset via keycloak-email-service
-->
<template>
  <div>
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Passwort zurücksetzen
        </h3>
        <p class="max-w-2xl text-sm text-gray-500">
          Du möchtest ein neues Passwort? Los gehts.
        </p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <Base
            class="py-4"
            component="Password"
            :label="'Neues Passwort'"
            techName="password"
            v-model="state.password"
            :errors="errors.password && errors.password.$errors"
          />
        </dl>
        <dl class="divide-y divide-gray-200">
          <Base
              class="py-4"
              component="Password"
              :label="'Neues Passwort bestätigen'"
              techName="password-repeat"
              v-model="state.passwordRepeat"
              :errors="errors.passwordRepeat && errors.passwordRepeat.$errors"
          />
        </dl>
      </div>
    </div>
    <div class="mt-4 flex justify-end py-4">
      <button type="submit" class="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">Speichern</button>
    </div>
  </div>
</template>


<script setup lang="ts">

import {reactive} from "vue";

const errors = ref([]);

const state = reactive({
  password: '',
  passwordRepeat: '',
});

</script>
