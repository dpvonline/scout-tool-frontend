<template>
  <div>
    <BaseField
      component="TextArea"
      :label="'Zusätzliche Nachricht'"
      techName="freeText"
      v-model="state.freeText"
      :errors="errors.freeText?.$errors"
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
import moment from "moment";

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

const props = defineProps({
  items: Object,
});

const state = reactive({
  freeText: null,
});

const rules = {
  freeText: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});

async function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  const data = {
    id: props.items?.id,
    registration: props.items?.registration,
    stringField: state.freeText,
    type: "stringAttribute",
  }
  const res = await eventRegisterStore.updateAttribute(
    props.items?.id,
    data,
    "string"
  );

  if ((res.statusCode = "200")) {
    const id = route.params.id;
    const response = await eventStore.fetchRegistration(id);
    commonStore.showSuccess("Freitext erfolfreich gespeichert.");
    onCloseClicked();
  } else {
    commonStore.showError("Fehler beim speichern.");
  }
}

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const scoutOrgaLevels = computed(() => {
  return eventStore.scoutOrgaLevels;
});


onMounted(async () => {
  state.freeText = props.items?.stringField;
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>
