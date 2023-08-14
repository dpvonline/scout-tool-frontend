<template>
  <div>
    <BaseField
      v-if="!isEdit"
      component="Select"
      techName="module"
      v-model="state['module']"
      label="Module"
      :items="modules"
      hint="Wähle das Module aus."
      :errors="errors.module && errors.module.$errors"
      :lookupListDisplay="['header']"
    />
    <div v-if="state.module || isEdit">
      <BaseField
        component="Text"
        :label="'Titel'"
        techName="header"
        v-model="state.header"
        :errors="errors.header?.$errors"
        :cols="12"
      />
      <BaseField
        component="TextArea"
        :label="'Beschreibung'"
        techName="description"
        v-model="state.description"
        :errors="errors.description?.$errors"
        :cols="12"
      />
      <PrimaryButton
        class="my-4"
        @click="onSaveClicked"
        :isLoading="!!isLoading"
        label="Speichern"
      />
    </div>
    <div v-else>
      <PrimaryButton
        class="my-4"
        color="green"
        @click="onNewCustomModuleClicked"
        :isLoading="!!isLoading"
        label="Neues Module erstellen"
      />
    </div>
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
const route = useRoute();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const props = defineProps({
  items: Object,
});

const state = reactive({
  module: null,
  header: null,
  description: null,
});

watch(
  () => state.module,
  (newValue) => {
    state.header = state.module.header;
    state.description = state.module.description;
  }
);

const rules = {
  header: {
    required,
  },
  description: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});
let modules = ref({});

function onNewCustomModuleClicked() {
  debugger;
}

async function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  const eventId = route.params.id;

  if (!isEdit.value) {
  const data = {
    module: state.module,
    header: state.header,
    description: state.description,
    event: eventId,
  }

  const res = await eventStore.createEventModule(
    eventId,
    data,
  );
  if ((res.status === 201)) {

    const response = await eventStore.fetchEvent(eventId);
    commonStore.showSuccess("Erfolfreich gespeichert.");
    onCloseClicked();
  } else {
    commonStore.showError("Fehler beim speichern.");
  }
  } else {
  const data = {
    id: props.items.id,
    name: props.items.name,
    header: state.header,
    description: state.description,
    internal: props.items.internal,
    event: props.items.event,
    required: props.items.required,
    standard: props.items.standard,
  }
  console.log(data);
  const res = await eventStore.updateEventModuleById(
    eventId,
    props.items.id,
    data,
  );
  if ((res.ststus === 200)) {
    const response = await eventStore.fetchEvent(eventId);
    commonStore.showSuccess("Erfolfreich gespeichert.");
    onCloseClicked();
  } else {
    commonStore.showError("Fehler beim speichern.");
  }
  }
}

const isEdit = computed(() => {
  return !!props.items && !!props.items.id;
});

onMounted(async () => {
  const eventId = route.params.id;
  eventStore.fetchAvailableModules(eventId).then((res) => {
      modules.value = res.data
    })
  if (!isEdit.value) {
  } else {
    state.header = props.items?.header;
    state.description = props.items?.description;
  }
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>