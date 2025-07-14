<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div v-if="!isLoading">Fehler</div>
    <div v-else>
      <LoadingItem />
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingItem from "@/components/list/LoadingItem.vue";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

onMounted(() => {
  const shortname = route.params.eventname;
  if (shortname) {
    eventStore
      .fetchEvents({ technical_name: shortname })
      .then((response: any) => {
        try {
          if (response.data.length === 1) {
            router.push({
              name: "InvitationDetail",
              params: {
                id: response.data[0].id,
              },
            });
          } else {
            isLoading.value = false;
            commonStore.showError(`Event ${shortname} nicht gefunden`);
          }
        } catch (e) {
          isLoading.value = false;
          commonStore.showError(`Event ${shortname} nicht gefunden`);
        }
      });
  }
});
</script>
  