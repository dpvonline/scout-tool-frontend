<template>
  <div>
    <!-- <BaseField
      component="Toggle"
      label="Erfolgreich Bearbeitet?"
      techName="isProcessed"
      v-model="state.isProcessed"
      :errors="errors.isProcessed?.$errors"
    /> -->
    <BaseField
      component="Select"
      v-model="state.issueType"
      techName="issueType"
      label="Typ"
      :items="issueTypes"
      :errors="errors.issueType?.$errors"
    />
    <BaseField
      component="Text"
      label="Betreff"
      techName="messageSubject"
      :disabled="true"
      v-model="state.messageSubject"
      :errors="errors.messageSubject?.$errors"
    />
    <BaseField
      component="TextArea"
      label="Text"
      techName="messageBody"
      :disabled="true"
      v-model="state.messageBody"
      :errors="errors.messageBody?.$errors"
    />
    <BaseField
      component="TextArea"
      label="Interner Vermerk"
      techName="internalComment"
      v-model="state.internalComment"
      :errors="errors.internalComment?.$errors"
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
  createdByEmail: "",
  createdBy: {},
  supervisor: {},
  internalComment: "",
  isProcessed: false,
  issueType: null,
  messageSubject: "",
  messageBody: "",
});

const rules = {
  createdByEmail: {
    email,
  },
  isProcessed: {
    required,
  },
  issueType: {
    required,
  },
  messageSubject: {
    required,
  },
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
    .updateMessage({
      id: state.id,
      createdByEmail: state.createdByEmail,
      createdBy: state.createdBy?.id,
      supervisor: null,
      internalComment: state.internalComment,
      isProcessed: state.isProcessed,
      messageSubject: state.messageSubject,
      messageBody: state.messageBody,
      issueType: state.issueType.id,
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

onMounted(() => {
  messageStore.fetchIssueTypes();
  setTimeout(function () {
    state.id = props.items?.id;
    state.createdByEmail = props.items?.createdByEmail;
    state.createdBy = props.items?.createdBy;
    state.supervisor = props.items?.supervisor;
    state.internalComment = props.items?.internalComment;
    state.isProcessed = props.items?.isProcessed;
    state.messageSubject = props.items?.messageSubject;
    state.messageBody = props.items?.messageBody;
    state.issueType = issueTypes.value.filter(
      (item) => item?.id === props.items?.issueType?.id
    )[0];
    console.log(state);
  }, 300);
});
</script>
