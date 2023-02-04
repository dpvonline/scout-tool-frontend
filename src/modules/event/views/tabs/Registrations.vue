<template>
<TabWrapper>
  <SimpleList
    :items="eventOverviews"
    detailPageLink="EventDetail"
>
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

import SimpleList from '@/components/list/SimpleList.vue'
import TabWrapper from '@/components/base/TabWrapper.vue'
import EventListItem from '@/modules/event/components/EventListItem.vue'
import EventListItemEmpty from '@/modules/event/components/EventListItemEmpty.vue'

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const route = useRoute();

const eventOverviews = computed(() => {
  return [];
});


onMounted(() => {
  eventStore.fetchEventOverviews();
});

</script>
