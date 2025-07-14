<template>
  <div>
    <BaseField
      component="Select"
      :label="'Datentyp'"
      techName="fieldType"
      v-model="state.fieldType"
      :errors="errors.fieldType?.$errors"
      :items="attributeChoices"
      :cols="12"
    />
    <BaseField
      component="Text"
      :label="'Titel'"
      techName="title"
      v-model="state.title"
      :errors="errors.title?.$errors"
      :cols="12"
    />
    <BaseField
      component="Toggle"
      :label="'Pflichtfeld'"
      techName="isRequired"
      v-model="state.isRequired"
      :errors="errors.isRequired?.$errors"
      :cols="12"
    />
    <BaseField
      component="Text"
      :label="'Hinweis'"
      techName="text"
      v-model="state.text"
      :errors="errors.text?.$errors"
      :cols="12"
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
  id: null,
  eventModule: null,
  fieldType: null,
  title: null,
  text: null,
  isRequired: null,
});

const rules = {
  eventModule: {
    required,
  },
  fieldType: {
    required,
  },
  title: {
    required,
  },
  text: {
    required,
  },
  isRequired: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});
let modules = ref({});
let attributeChoices = ref([]);

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
      eventModule: state.eventModule,
      fieldType: state.fieldType.value,
      title: state.title,
      text: state.text,
      isRequired: state.isRequired,
    };

    const res = await eventStore.createAttributeModule(data);
    if (res.status === 201) {
      const response = await eventStore.fetchEvent(eventId);
      commonStore.showSuccess("Erfolfreich gespeichert.");
      onCloseClicked();
    } else {
      commonStore.showError("Fehler beim speichern.");
    }
  } else {
    const data = {
      id: state.id,
      eventModule: state.eventModule,
      fieldType: state.fieldType.value,
      title: state.title,
      text: state.text,
      isRequired: state.isRequired,
    };
    const res = await eventStore.updateAttributeModule(data);
    if (res.status === 200) {
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
  const res = await eventStore.fetchAttributeTypes();

  attributeChoices.value = res;
  state.eventModule = props.items.eventModule;
  if (isEdit.value) {
    state.fieldType = attributeChoices.value.find(
      (a) => a["name"] === props.items.fieldType
    );
    state.id = props.items.id;
    state.title = props.items.title;
    state.text = props.items.text;
    state.isRequired = props.items.isRequired;
  }
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>
