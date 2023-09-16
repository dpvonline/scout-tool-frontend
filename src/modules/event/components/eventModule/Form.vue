<template>
  <div>
    <BaseField
      v-if="!isEdit && !isCreate"
      component="Select"
      techName="module"
      v-model="state['module']"
      label="Module"
      :items="modules"
      hint="Wähle das Module aus."
      :errors="errors.module && errors.module.$errors"
      :lookupListDisplay="['header']"
    />
    <div v-if="state.module || isEdit || isCreate">
      <BaseField
        component="Text"
        :label="'Name des Modules'"
        techName="header"
        :hint="''"
        v-model="state.header"
        :errors="errors.header?.$errors"
        :cols="12"
      />
      <BaseField
      component="Text"
        :label="'Component'"
        techName="name"
        :hint="'name for Component'"
        v-model="state.name"
        :errors="errors.name?.$errors"
        :cols="12"
      />
      <BaseField
        component="Html"
        :label="'Beschreibung'"
        :hint="'Dieser Text wird über den Daten angezeigt.'"
        techName="description"
        v-model="state.description"
        :errors="errors.description?.$errors"
        :cols="12"
      />
      <PrimaryButton
        v-if="isEdit"
        class="my-4"
        @click="onSaveClicked"
        :isLoading="!!isLoading"
        label="Änderungen speichern"
      />
      <PrimaryButton
        v-if="isCreate || state.module"
        class="my-4"
        @click="onSaveClicked"
        :isLoading="!!isLoading"
        label="Module erstellen und hinzufügen."
      />
    </div>
    <div v-if="!isEdit && !isCreate && !state.module">
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

import { reactive, onMounted, ref, watch, computed, getTransitionRawChildren } from "vue";
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
  name: 'Custom',
  module: null,
  header: null,
  ordering: null,
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
  name: {
    required,
  },
  header: {
    required,
  },
  // description: {
  //   required,
  // },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});
const isCreate = ref(false);
let modules = ref({});

function onNewCustomModuleClicked() {
  isCreate.value = true;
}

const event = computed(() => {
  return eventStore.event;
});

function getOrderingValue () {
  let ordering = 1;
  const modules = event.value.eventmoduleSet;
  if (modules && modules.length) {
    modules[modules.length - 2].ordering
  }
  return ordering
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
    name: state.name,
    description: state.description,
    ordering: getOrderingValue(),
    event: eventId,
  }
  const res = await eventStore.createEventModule(
    eventId,
    data,
  );
  if ((res.status === 201)) {

    const response = await eventStore.fetchEvent(eventId);
    commonStore.showSuccess("Erfolgreich gespeichert.");
    onCloseClicked();
  } else {
    commonStore.showError("Fehler beim speichern.");
  }
  } else {
  const data = {
    id: props.items.id,
    name: state.name,
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
  if ((res.status === 200)) {
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
    state.name = props.items?.name;
    state.header = props.items?.header;
    state.description = props.items?.description;
  }
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>
