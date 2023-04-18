<template>
  <TabWrapper>
    <SimpleList :items="registrations" detailPageLink="RegistrationsDetail">
      <template v-slot:notEmpty="slotProps">
        <RegistrationListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <EventListItemEmpty>
          Du bist aktuell bei keiner Veranstaltungen angemeldet
        </EventListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import RegistrationListItem from "@/modules/event/components/RegistrationListItem.vue";
import EventListItemEmpty from "@/modules/event/components/EventListItemEmpty.vue";

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const route = useRoute();

const registrations = computed(() => {
  return eventStore.registrations;
});

onMounted(() => {
  eventStore.fetchMyRegistrations();
});
</script>
