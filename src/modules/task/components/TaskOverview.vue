<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ props.task }}
      </h3>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">-</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ props.task }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">-</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ props.task ? props.task : "-" }}
          </dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Noch keine Beschreibung hinterlegt
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  task: Object,
});
</script>
