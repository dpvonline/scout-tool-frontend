<template>
  <div>
    <Breadcrumbs :pages="pages" />
    <main
      class="
        relative
        h-screen
        z-40
        flex-1
        focus:outline-none
        overflow-y-auto
        pb-12
      "
    >
      <article class="flex-shrink-0 border border-gray-200 ma-12">
       <NewMessageForm/>
      </article>
    </main>
  </div>
</template>


<script setup lang="ts">
import { reactive, onMounted, computed, ref } from "vue";
import Base from "@/components/field/Base.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import Success from "@/modules/common/components/Success.vue";
import { useMessageStore } from "@/modules/message/store";
import NewMessageForm from "@/modules/message/components/NewMessageForm.vue";
import { useRoute } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const route = useRoute();

const pages = computed(() => {
  return [{ name: "Alle Nachrichten", link: "MessageMain", current: false }];
});

const state = ref({
  createdByEmail: null,
  issueType: null,
  messageBody: null,
  messageSubject: null,
});

const rules = {
  createdByEmail: {
    required,
    minLength: minLength(5),
    email,
  },
  issueType: { required },
  messageSubject: { required },
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

function onButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  isLoading.value = true;
  messageStore
    .createMessage({
      createdByEmail: state.value.createdByEmail,
      issueType: state.value.issueType.id,
      messageBody: state.value.messageBody,
      messageSubject: state.value.messageSubject,
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

onMounted(() => {
  messageStore.fetchIssueTypes();
});
</script>
