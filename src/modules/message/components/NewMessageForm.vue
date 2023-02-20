<template>
  <form class="space-y-8 divide-y px-3 py-4 divide-gray-200 xl:px-64">
    <div class="space-y-8 divide-y divide-gray-200">
      <h2 class="text-h1 font-medium text-gray-900">Deine Nachricht</h2>
      <div class="pt-8">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Wir freuen uns auf deine Nachricht.
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1">
          <Base
            component="Text"
            :label="'Dein Name*'"
            techName="createdByName"
            v-model="state['createdByName']"
            :errors="errors.createdByName && errors.createdByName.$errors"
            :cols="12"
          />
          <Base
            component="EMail"
            :label="'Deine E-Mail*'"
            techName="createdByEmail"
            v-model="state['createdByEmail']"
            :errors="errors.createdByEmail && errors.createdByEmail.$errors"
            :cols="12"
          />
          <Base
            component="Text"
            :label="'Betreff*'"
            techName="issueSubject"
            v-model="state['issueSubject']"
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
            hint="Wählenklnkjlnkklnlkeine Zutat."
            :errors="errors.issueType && errors.issueType.$errors"
          />
          <Base
            :cols="12"
            component="Select"
            techName="priority"
            v-model="state['priority']"
            label="Prioität"
            :items="messagePrios"
            hint="W"
            :errors="errors.priority && errors.priority.$errors"
          />
          <Base
            component="TextArea"
            :label="'Nachricht'"
            techName="messageBody"
            v-model="state['messageBody']"
            :errors="errors.messageBody && errors.messageBody.$errors"
            :cols="12"
          />
        </div>
      </div>
    </div>

    <div class="pt-5 pb-12">
      <div class="flex justify-end">
        <PrimaryButton
          @click="onButtonClicked"
          label="Speichern"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </form>
</template>


<script setup lang="ts">
import { reactive, onMounted, computed, ref } from "vue";
import Base from "@/components/field/Base.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import Success from "@/modules/common/components/Success.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";
import { useMessageStore } from "@/modules/message/store";
import { useRoute } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const route = useRoute();

const pages = computed(() => {
  return [{ name: "Alle Nachrichten", link: "MessageMain", current: false }];
});

const state = ref({
  createdByEmail: null,
  createdByName: null,
  priority: null,
  issueType: null,
  messageBody: null,
  issueSubject: null,
});

const rules = {
  createdByEmail: {
    required,
    minLength: minLength(5),
    email,
  },
  issueType: { required },
  issueSubject: { required },
  messageBody: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);

const messageStore = useMessageStore();

import { useAuthStore } from "@/modules/auth/store/index"

const authStore = useAuthStore()

import { useRouter } from "vue-router";
const router = useRouter();

import { useCommonStore } from "@/modules/common/store";
const commonStore = useCommonStore();

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
      createdByName: state.value.createdByName,
      createdByEmail: state.value.createdByEmail,
      priority: state.value.priority.id,
      issueType: state.value.issueType.id,
      messageBody: state.value.messageBody,
      issueSubject: state.value.issueSubject,
    })
    .then((response) => {
      if (response && response.status === 201) {
        router.push({
          name: "home",
        });
        commonStore.showSuccess("Nachricht erfolgreich angelegt");
      } else if (response && response.status === 400) {
        commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
      } else {
        console.log(response);
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const issueTypes = computed(() => {
  return messageStore.issueTypes;
});

const messagePrios = computed(() => {
  return messageStore.messagePrios;
});

onMounted(() => {
  messageStore.fetchMessagePrio();
  if (authStore.isAuth) {
    messageStore.fetchIssueTypes();
  } else {
    messageStore.fetchIssueTypesShort()
  }
});
</script>
