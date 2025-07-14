<template>
  <div>
    <div v-if="!isLoading">
      <BaseField
        :component="getComponentType(props.items?.fieldType)"
        :label="props.items?.title"
        techName="freeText"
        :hint="props.items?.text"
        v-model="state.value"
        :errors="errors.value?.$errors"
        :cols="12"
      />
      <PrimaryButton
        class="my-4"
        @click="onSaveClicked"
        :isLoading="!!isLoading"
        :label="isEdit ? 'Ändern' : 'Erstellen'"
      />
    </div>
    <div v-else>
      <LoadingItem />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, watch, computed } from "vue";
import { useCommonStore } from "@/modules/common/store/index";
import { useEventEditStore } from "@/modules/event/store/edit";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";
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
  value: Object,
});

const state = reactive({
  value: null,
});

const rules = {
  value: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});

async function onSaveClicked() {
  const redId = route.params.id;
  const fieldType = props.items?.fieldType;
  isLoading.value = true;

  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  if (isEdit.value) {
    const data = {
      id: props.value?.id,
      registration: redId,
      [fieldTypes[fieldType]]: state.value,
      type: props.items?.fieldType,
    };
    const res = await eventRegisterStore.updateAttribute(
      props.value?.id,
      data,
      props.items?.fieldType
    );
    if (res.status = "200") {
      const response = await eventStore.fetchRegistration(redId);
      commonStore.showSuccess("erfolfreich gespeichert.");
      onCloseClicked();
    } else {
      commonStore.showError("Fehler beim speichern.");
      isLoading.value = false;
    }
  }
  if (!isEdit.value) {
    const data = {
      registration: redId,
      [fieldTypes[fieldType]]: state.value,
      type: props.items?.fieldType,
      attributeModule: props.items?.id,
    };
    const res = await eventRegisterStore.createAttribute(
      redId,
      data,
      props.items?.fieldType
    );
    if (res.status = "201") {
      const response = await eventStore.fetchRegistration(redId);
      commonStore.showSuccess("erfolfreich erstellt.");
      onCloseClicked();
    } else {
      commonStore.showError("Fehler beim speichern.");
      isLoading.value = false;
    }
  }
}

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const isEdit = computed(() => {
return !!props.value;
});

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

const fieldTypes = {
  booleanAttribute: "booleanField",
  dateTimeAttribute: "dateTimeField",
  integerAttribute: "integerField",
  floatAttribute: "floatField",
  stringAttribute: "stringField",
  travelAttribute: "travelField",
};

onMounted(async () => {
  try {
    const fieldType = props.items?.fieldType;
    state.value = props.value[fieldTypes[fieldType]];
  } catch (e) {
    state.value = null;
  }
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>
