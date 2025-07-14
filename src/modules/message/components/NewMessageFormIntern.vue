<template>
  <div class="pt-8">
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      Wir freuen uns auf deine Nachricht.
    </h3>
    <div class="mt-6 grid grid-cols-1">
      <Base
        component="Text"
        :label="'Betreff*'"
        techName="issueSubject"
        v-model="state['issueSubject']"
        hint="Fasse dein Anliegen kurz zusammen."
        :errors="errors.issueSubject && errors.issueSubject.$errors"
        :cols="12"
      />
      <Base
        :cols="12"
        component="Select"
        techName="issueType"
        v-model="state['issueType']"
        label="Hauptkategorie"
        :items="issueTypes"
        hint="Wähle den Typ deines Anliegens."
        :errors="errors.issueType && errors.issueType.$errors"
      />
      <Base
        :cols="12"
        component="Select"
        techName="priority"
        v-model="state['priority']"
        label="Prioität"
        :items="messagePrios"
        hint="Wie drigend ist dein Anliegen?"
        :errors="errors.priority && errors.priority.$errors"
      />
      <Base
        component="TextArea"
        :label="'Nachricht'"
        techName="messageBody"
        v-model="state['messageBody']"
        :errors="errors.messageBody && errors.messageBody.$errors"
        :cols="12"
        hint="Erkläre dein Anliegen."
      />
    </div>
  </div>

  <div class="pt-5 pb-12">
    <div class="flex justify-end">
      <PrimaryButton
        @click="onButtonClicked"
        label="Speichern"
        :isLoading="!!isLoading"
        :icon="StarIcon"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, onMounted, computed, ref } from "vue";
import Base from "@/components/field/Base.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import Success from "@/modules/common/components/Success.vue";
import { useMessageStore } from "@/modules/message/store";
import PageWrapper from "@/components/base/PageWrapper.vue";
import { useRoute } from "vue-router";

import { StarIcon } from "@heroicons/vue/24/outline";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const route = useRoute();

const pages = computed(() => {
  return [{ name: "Alle Nachrichten", link: "MessageMain", current: false }];
});

const state = reactive({
  priority: null,
  issueType: null,
  messageBody: null,
  issueSubject: null,
});

const rules = {
  issueType: { required },
  issueSubject: { required },
  priority: { required },
  messageBody: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);

const messageStore = useMessageStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { useCommonStore } from "@/modules/common/store";
const commonStore = useCommonStore();

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

const isAuth = computed(() => {
  return authStore.isAuth;
});

function onButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  isLoading.value = true;
  messageStore
    .createIssue({
      priority: state.priority.id,
      issueType: state.issueType.id,
      messageBody: state.messageBody,
      issueSubject: state.issueSubject,
    })
    .then((response) => {
      if (response && response.status === 201) {
        router.push({
          name: "DashboardMain",
        });
        commonStore.showSuccess("Nachricht erfolgreich angelegt");
      } else if (response && response.status === 400) {
        commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
      } else {
        console.log(response);
      }
    });
}

const issueTypes = computed(() => {
  return messageStore.issueTypes;
});

const messagePrios = computed(() => {
  return messageStore.messagePrios;
});

function fillData() {
  state.priority = messagePrios.value[1];
  state.issueType = issueTypes.value[0];
}

onMounted(async () => {
  let requestList = [
    messageStore.fetchMessagePrio(),
    messageStore.fetchIssueTypesShort(),
  ];

  await Promise.all(requestList);

  fillData();
});
</script>
