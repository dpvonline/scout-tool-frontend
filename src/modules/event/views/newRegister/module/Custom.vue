<template>
  <StepFrame
    :header="props.step?.header"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <p v-html="props.step?.description" class="text-lg text-gray-800"></p>
      <div
        v-for="attribute in currentAttributes"
        class="mt-4 space-y-4"
        :key="attribute.id"
      >
        <BaseField
          :component="getComponentType(attribute.fieldType)"
          :label="attribute.title"
          :techName="`value_${attribute.id}`"
          v-model="state[`value_${attribute.id}`]"
          :cols="12"
          :hint="attribute.text"
        />
      </div>
      <div v-if="!currentAttributes?.length">Keine Attribute</div>
    </fieldset>
  </StepFrame>
</template>
  
  <script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventStore } from "@/modules/event/store/index";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  step: Object,
});

const state = reactive({});

const rules = {};

const router = useRouter();

const route = useRoute();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);
const currentCustomData = ref({});

function onNextButtonClicked() {
  const moduleId = route.params.module;
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  eventRegisterStore.updateRegisterCustom(moduleId, state);

  router.push({
    name: props.step.nextLink,
    params: {
      module: props.step.nextId,
    },
  });
}

function setInitData() {
  const moduleId = route.params.module;
  isLoading.value = true;
  try {
    currentCustomData.value = registerCustom?.value[moduleId];
    const valueFields = Object.keys(currentCustomData.value)
    valueFields.forEach(field => state[field] = currentCustomData.value[field])
  } catch (e) {
    currentCustomData.value = {};
  }


  isLoading.value = false;
}

function getComponentType(fieldType: string) {
  switch (fieldType) {
    case "booleanAttribute":
      return "Toggle";
    case "dateTimeAttribute":
      return "DateTime";
    case "integerAttribute":
      return "Number";
    case "floatAttribute":
      return "Number";
    case "stringAttribute":
      return "Text";
    default: {
      return "";
    }
  }
}

const registerCustom = computed(() => {
  const moduleId = route.params.module;
  return eventRegisterStore.registerCustom;
});

const currentModule = computed(() => {
  return eventStore.event.eventmoduleSet[props.step.id - 1];
});

const currentAttributes = computed(() => {
  const moduleId = route.params.module;
  try {
    return eventStore.event.eventmoduleSet.find(
      (module) => module.id == moduleId
    ).attributeModules;
  } catch (error) {
    return [];
  }
});

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([]);

  setInitData();
});
</script>
  