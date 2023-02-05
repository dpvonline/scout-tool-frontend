<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Betreff: {{ message.messageSubject }}</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ message.messageType?.name }}</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">E-Mail vom Absender</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ message.createdByEmail }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Zugewiesen</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ message.supervisor ? message.supervisor : ' - ' }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Erfolgreich bearbeitet</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ message.isProcessed ? 'Ja' : 'Nein'}}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Erstellt</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ message.createdAt ? moment(message.createdAt).format('llll') : '' }}</dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Nachricht</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ message.messageBody }}</dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Internes Kommentar</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ message.internalComment ? message.internalComment : 'Noch kein Vermerk' }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { PaperClipIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  message: Object,
});

</script>