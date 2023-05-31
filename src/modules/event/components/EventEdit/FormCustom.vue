<template>
  <div>
        <BaseField
          component="Select"
          :label="'E-Mail Template'"
          techName="emailSet"
          v-model="state.emailSet"
          :errors="errors.emailSet?.$errors"
          :cols="12"
          :items="emailSets"
          hint="Legt fest wie die E-Mails aussehen werden."
          :lookupListDisplay="['name']"
        />
        <BaseField
          component="Select"
          :label="'Layout'"
          techName="theme"
          v-model="state.theme"
          :errors="errors.theme?.$errors"
          :cols="12"
          :items="themes"
          hint="Legt fest in welchem Layout die Anmeldungen erscheinen sollen."
          :lookupListDisplay="['name']"
        />

    <PrimaryButton
      class="my-4"
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Speichern"
    />
  </div>
</template>

<script setup lang="ts">

import { reactive, onMounted, ref, watch, computed } from "vue";
import { useCommonStore } from "@/modules/common/store/index";
import { useEventEditStore } from "@/modules/event/store/edit";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute } from "vue-router";
import router from "@/router";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const commonStore = useCommonStore();
const eventEditStore = useEventEditStore();
const route = useRoute();

const format1 = "YYYY-MM-DDTHH:mm";

const state = reactive({
  emailSet: null,
  theme: null,
});

const rules = {
  emailSet: {
    required,
  },
  theme: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;

  const returnObj = data.value;
  returnObj.emailSet = state.emailSet.id;
  returnObj.theme = state.theme.id;

  eventEditStore
    .updateEvent(returnObj)
    .then((response) => goToRoute(response.data.id));
}

function goToRoute(id: number) {
  router.push({
    name: "EventDetail",
    params: {
      id: id,
    },
  });
  //todo
  if (router.currentRoute.value.name === "EventDetail") {
    router.go(router.currentRoute.value);
  }
}

import { useGroupStore } from "@/modules/group/store/index";
const groupStore = useGroupStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const themes = computed(() => {
  return eventStore.themes;
});

const emailSets = computed(() => {
  return eventStore.emailSets;
});

function setInitData(data) {
  state.emailSet = emailSets.value.find((a) => a["id"] === data.emailSet);
  state.theme = themes.value.find((a) => a["id"] === data.theme);
}

onMounted(async () => {
  const id = route.params.id;
  await Promise.all([
    eventStore.fetchThemes(),
    eventStore.fetchEmailSets(),
  ]);
  if (id) {
    const response = await eventEditStore.fetchTechById(id);
    setInitData(response.data);
    data.value = response.data;
  }
});
</script>
