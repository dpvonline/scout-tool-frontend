<template>
  <div>
    <BaseField
      component="Toggle"
      label="Öffentlich?"
      techName="is_public"
      :disabled="true"
      v-model="state.is_public"
      :errors="errors.is_public?.$errors"
    />
    <BaseField
      component="TextArea"
      label="Text"
      techName="messageBody"
      :disabled="true"
      v-model="state.messageBody"
      :errors="errors.messageBody?.$errors"
    />
    <PrimaryButton
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Nachricht speichern"
    />
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
  issue: null,
  messageBody: "",
  isPublic: false,
});

const rules = {
  messageBody: {
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

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;

  messageStore
    .createMessage({
      issue: state.issue,
      messageBody: state.messageBody,
      isPublic: state.isPublic,
    })
    .then((response: any) => {
      goToRoute(response.data.id);
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

onMounted(() => {
  state.issue = props.items?.id
});
</script>
