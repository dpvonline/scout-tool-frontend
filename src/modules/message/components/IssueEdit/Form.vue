<template>
  <div>
    <BaseField
      component="Select"
      v-model="state.issueType"
      techName="issueType"
      label="Typ"
      :items="issueTypes"
      :errors="errors.issueType?.$errors"
    />
    <BaseField
      component="Select"
      v-model="state.priority"
      techName="priority"
      label="Prioität"
      :items="messagePrios"
      :errors="errors.priority?.$errors"
    />
    <BaseField
      component="Select"
      v-model="state.status"
      techName="status"
      label="Aktueller Status"
      :items="messageStatuses"
      :errors="errors.status?.$errors"
    />
    <PrimaryButton @click="onSaveClicked" :isLoading="!!isLoading" label="Nachricht speichern" />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

import { reactive, onMounted, ref, watch, computed } from "vue";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useMessageStore } from "@/modules/message/store/index";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

const state = reactive({
  id: null,
  issueType: null,
  status: null,
  priority: null,

});

const rules = {
  status: {
    required,
  },
  priority: {
    required,
  },
  issueType: {
    required,
  },
};

const props = defineProps({
  items: { type: Object, required: true },
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);

const messageStore = useMessageStore();

const issueTypes = computed(() => {
  return messageStore.issueTypes;
});

const messagePrios = computed(() => {
  return messageStore.messagePrios;
});

const messageStatuses = computed(() => {
  return messageStore.messageStatuses;
});

const issue = computed(() => {
  return messageStore.issue;
});


function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;
  debugger;
  messageStore
    .updateIssue({
      id: state.id,
      issueType: state.issueType.id,
      status: state.status.value,
      priority: state.priority.value,
    })
    .then((response: any) => {
      goToRoute(response.data.id)
    });
}

function goToRoute(id: number) {
  router.push({
    name: "MessageDetail",
    params: {
      id: id,
    },
  });
  if (router.currentRoute.value.name === "MessageDetail") {
    router.go(router.currentRoute.value);
  }
}

import { useRoute } from "vue-router";
const route = useRoute();

import { useRouter } from "vue-router";
const router = useRouter();

function fillData(items) {
  state.id = items.id;

  state.issueType = issueTypes.value.find(
    (a) => a["id"] === items.issueType.id
  );
  state.priority = messagePrios.value.find(
    (a) => a["value"] === items.priority
  );
  state.status = messageStatuses.value.find(
    (a) => a["value"] === items?.status
  );
}

onMounted(async () => {
  await Promise.all([
    messageStore.fetchMessagePrio(),
    messageStore.fetchMessageStatuses(),
    messageStore.fetchIssueTypes(),
    ]);

  fillData(props.items);
});
</script>
