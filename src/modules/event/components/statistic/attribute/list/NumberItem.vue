<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
      <div>
        <p class="text-sm font-medium text-black-600">
          {{ props?.item?.registration?.scoutOrganisation?.name }}
        </p>
        <p class="text-sm font-medium text-black-600">
          {{ props?.item?.integerField }}
        </p>
      </div>
    </div>
    <div class="flex-0">
      <PrimaryButton
        @click="onRegClicked(props?.item?.registration?.id)"
        color="blue"
        >öffnen</PrimaryButton
      >
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import PrimaryButton from "@/components/button/Primary.vue";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

import {
  ClipboardIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

const props = defineProps({
  item: Object,
});

const emit = defineEmits(["onTravelEditClicked"]);

const onTravelEditClicked = (data) => {
  emit("onTravelEditClicked", data);
};

function onRegClicked(id) {
  router.push({
    name: "RegistrationsDetail",
    params: {
      id,
    },
  });
}
</script>
  