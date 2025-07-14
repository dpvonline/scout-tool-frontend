<template>
  <div class="space-y-2">
    <div class="space-y-1">
      <label
        for="add-team-members"
        class="block text-sm font-medium text-gray-700"
        >{{ props.label }}</label
      >
      <p id="add-team-members-helper" class="sr-only">
        Suche
      </p>
      <div class="flex">
        <div class="flex-grow">
        <BaseField
          component="AutoComplete"
          techName="scoutGroup"
          v-model="state.group"
          :items="groups"
          hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
          :lookupListDisplay="['name']"
        />
        </div>
        <span class="ml-3">
          <button
            type="button"
            class="
              mt-3
              inline-flex
              items-center
              rounded-md
              border border-gray-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              shadow-sm
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              focus:ring-offset-2
            "
          >
            <!-- Heroicon name: mini/plus -->
            <svg
              class="-ml-2 mr-1 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
              />
            </svg>
            <span>Add</span>
          </button>
        </span>
      </div>
    <p class="mt-2 text-sm text-red-500" id="email-description">
      {{ props.errors[0] && props.errors[0].$message }}
    </p>
    <p class="mt-2 text-sm text-gray-500">
      {{ props.hint }}
    </p>
    </div>

    <div class="border-b border-gray-200">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-if="props.modelValue" class="flex py-4" v-for="item in props.modelValue" :key="item.id">
          <div class="ml-3 flex flex-col">
            <span class="text-sm font-medium text-gray-900"
              >{{ item.name }}</span
            >
          </div>
        </li>
        <li v-else>
          <div class="ml-3 flex flex-col">
            <span class="text-sm font-medium text-gray-900"
              > Keine Anträge</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useGroupStore } from "@/modules/group/store/index";

import BaseField from '@/components/field/Base.vue'

const state = reactive({
  group: null,
});

const groupStore = useGroupStore();

const isLoading = computed(() => {
  return groupStore.isLoading;
});
const groups = computed(() => {
  return groupStore.groups;
});

onMounted(() => {
  groupStore.fetchGroups();
});

const props = defineProps({
  modelValue: { type: Number, required: true },
  errors: { type: Array, required: false, default: [] },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: "" },
  cols: { type: Number, required: false, default: 3 },
  items: { type: Array, required: true },
  disabled: { type: Boolean, required: false, default: false },
  lookupListDisplay: { type: Array, required: false, default: ["name"] },
  searchField: { type: Array, required: false, default: ["name"] },
});
</script>
