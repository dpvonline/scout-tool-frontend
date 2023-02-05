<template>
  <TabWrapper>
    <!-- <PrimaryButton class="my-2" color="blue" :icon="PlusIcon">
      Neue Veranstaltungen erstellen
    </PrimaryButton> -->
    <SimpleList :items="eventOverviews" detailPageLink="EventDetail">
      <template v-slot:notEmpty="slotProps">
        <EventListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <EventListItemEmpty>
          Du bist aktuell bei keiner Veranstaltungen angmeldet
        </EventListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import EventListItem from "@/modules/event/components/EventListItem.vue";
import PrimaryButton from "@/components/button/Primary.vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const route = useRoute();

const eventOverviews = computed(() => {
  return eventStore.eventOverviews;
});

onMounted(() => {
  eventStore.fetchEventOverviews();
});
</script>
