<template>
  <div class="sm:col-span-3">
    <SwitchGroup as="div" class="flex items-center">
      <Switch
        :value="modelValue"
        @click="updateValue"
        :class="[
          modelValue ? 'bg-blue-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        ]"
      >
        <span
          aria-hidden="true"
          :class="[
            modelValue ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          ]"
        />
        <div
          v-if="hasError"
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <ExclamationCircleIcon
            class="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      </Switch>
      <SwitchLabel as="span" class="ml-3">
        <span class="text-sm font-medium text-gray-900">{{ props.label }}</span>
        <span class="text-sm text-gray-500">{{ props.hint }}</span>
      </SwitchLabel>
    </SwitchGroup>
    <p class="mt-2 text-sm text-red-500" id="email-description">
      {{ props.errors[0] && props.errors[0].$message }}
    </p>
    <p
      v-if="props.hint"
      class="mt-2 text-sm text-gray-500"
      id="email-description"
    >
      {{ props.hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  component: { type: String, required: true },
  label: { type: String, required: true },
  errors: { type: Array, required: false, default: [] },
  hint: { type: String, required: false, default: "" },
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const hasError = computed(() => {
  return props.errors[0] && props.errors.length;
});

const updateValue = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>
