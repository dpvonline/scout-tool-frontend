<template>
  <!-- Announcements -->
  <SmallList
    title="Meine Einladungen"
    :items ="eventOverviews"
    emptyText="Keine Einladungen"
    allButton="Zu meinen Einladungen"
    :isLoading="false"
    allLinkButtonName="EventInvitations"
  >
    <template v-slot:item="props">
      <p>
        {{ props.item.name }}
      </p>
    </template>
  </SmallList>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEventStore } from "@/modules/event/store";
import SmallList from  '@/components/list/SmallList.vue'

const eventStore = useEventStore();

const eventOverviews = computed(() => {
  return eventStore.eventOverviews;
});

const isLoading = onMounted(() =>{
  return eventStore.isLoading;
})

onMounted(() => {
  eventStore.fetchEventOverviews();
});
</script>
