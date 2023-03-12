<template>
<TabWrapper>
  <SimpleList
    :items="invitations"
    detailPageLink="InvitationDetail"
>
    <template v-slot:notEmpty="slotProps">
      <InvitationListItem :item="slotProps.item" />
    </template>
    <template v-slot:empty>
      <EventListItemEmpty>
        Du bist aktuell bei keiner Veranstaltungen eingeladen
      </EventListItemEmpty>
    </template>
  </SimpleList>
</TabWrapper>
</template>

<script setup lang="ts">

import SimpleList from '@/components/list/SimpleList.vue'
import TabWrapper from '@/components/base/TabWrapper.vue'
import InvitationListItem from '@/modules/event/components/InvitationListItem.vue'
import EventListItemEmpty from '@/modules/event/components/EventListItemEmpty.vue'

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const route = useRoute();

const invitations = computed(() => {
  return eventStore.invitations;
});


onMounted(() => {
  eventStore.fetchMyInvitations();
});

</script>
