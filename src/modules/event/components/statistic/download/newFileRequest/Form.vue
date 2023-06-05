<template>
  <div>
    <div v-if="!isLoading">
      <BaseField
        component="AutoComplete"
        label="Template"
        techName="fileTemplate"
        :items="fileTemplates"
        v-model="state['fileTemplate']"
        :errors="errors.fileTemplate?.$errors"
        :lookupListDisplay="[
          'extension',
          '$ - ',
          'type',
          '$ - Version ',
          'version',
        ]"
      />
      <BaseField
        component="Select"
        label="Typ"
        techName="Dateityp"
        :items="fileExtension"
        v-model="state.fileExtension"
        :errors="errors.fileExtension?.$errors"
      />
      <PrimaryButton
        @click="onSaveClicked"
        :isLoading="!!isSaving"
        label="Neue Datei erzeugen"
      />
    </div>
    <LoadingItem v-else />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

import { reactive, onMounted, ref, watch, computed } from "vue";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";
import { useMessageStore } from "@/modules/message/store/index";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

import { useGroupStore } from "@/modules/group/store/index";
const groupStore = useGroupStore();

const state = reactive({
  fileTemplate: null,
  fileExtension: "E",
});

const rules = {
  fileTemplate: {
    required,
  },
  fileExtension: {
    required,
  },
};

const isAuth = computed(() => {
  return authStore.isAuth;
});

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const isSaving = ref(false);

const createGroupChoise = computed(() => {
  return groupStore.createGroupChoise;
});

async function onSaveClicked() {
  const eventId = route.params.id;

  isSaving.value = true;

  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  const response = await eventStore.addFileRequest(eventId, {
    fileExtension: state.fileExtension?.value,
    template: state.fileTemplate?.id,
  });

  if (response) {
    commonStore.showSuccess("Datei erfolgreich angefordert");
  } else {
    commonStore.showError("Datei angefordern fehlgeschlagen.");
  }

  isSaving.value = false;
}

function goToRoute(id: number) {}

import { useRoute } from "vue-router";
const route = useRoute();

import { useRouter } from "vue-router";
const router = useRouter();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const fileTemplates = ref([]);
const fileExtension = ref([]);

function setInitData() {
  state.fileTemplate = fileTemplates.value[0];
  state.fileExtension = fileExtension.value[0];
}

onMounted(async () => {
  const eventId = route.params.id;
  isLoading.value = true;

  const response = await Promise.all([
    eventStore.getAvailableFileTemplates(),
    eventStore.getFileExtension(),
  ]);
  fileTemplates.value = response[0].data;
  fileExtension.value = response[1].data;

  setInitData();

  isLoading.value = false;
});
</script>
