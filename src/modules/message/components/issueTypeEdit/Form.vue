<template>
  <div>
    <BaseField
      component="Toggle"
      label="isPublic"
      techName="isPublic"
      v-model="state.isPublic"
      :errors="errors.isPublic?.$errors"
    />
    <BaseField
      component="Text"
      label="name"
      techName="name"
      v-model="state.name"
      :errors="errors.name?.$errors"
    />
    <BaseField
      component="Text"
      label="description"
      techName="description"
      v-model="state.description"
      :errors="errors.description?.$errors"
    />
    <BaseField
      component="Number"
      label="sorting"
      techName="sorting"
      v-model="state.sorting"
      :errors="errors.sorting?.$errors"
    />
    <BaseField
      component="MultiSelect"
      label="responsableGroups"
      techName="responsableGroups"
      v-model="state.responsableGroups"
      :errors="errors.responsableGroups?.$errors"
    />
    <PrimaryButton
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="speichern"
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

import { useRegisterStore } from "@/modules/auth/store/index";


const registerStore = useRegisterStore();

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

import { useAuthStore } from "@/modules/auth/store/index";
import { usePersonStore } from "@/modules/person/store/index";
const authStore = useAuthStore();

const state = reactive({
  id: null,
  name: null,
  description: null,
  isPublic: null,
  responsableGroups: null,
  sorting: null,
});

const rules = {
  name: {
    required,
  },
  description: {
    required,
  },
  responsableGroups: {
    required,
  },
  sorting: {
    required,
  },
};

const props = defineProps({
  items: { type: Object, required: true },
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
      name: state.name,
      description: state.description,
      isPublic: state.isPublic,
      responsableGroups: state.responsableGroups,
      sorting: state.sorting,
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

const personStore = usePersonStore();

const users = computed(() => {
  return personStore.users;
});

onMounted(() => {
  personStore.fetchUsers();
  setTimeout(function () {
    (state.id = props.items.id),
      (state.name = props.items.name),
      (state.description = props.items.description),
      (state.isPublic = props.items.isPublic),
      (state.responsableGroups = props.items.responsableGroups),
      (state.sorting = props.items.sorting);
  }, 300);
});
</script>
