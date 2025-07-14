<template>
  <div class="flex min-w-0 flex-1 items-center space-x-4">
    <div class="flex-1">
      {{ props.item.registration.scoutOrganisation.name }}
    </div>
    <div class="flex-1 text-sm font-medium text-black-600">
      {{ props.item.numberPersons }} Person/en
    </div>
    <div class="flex-1 text-sm font-medium text-black-600">
      {{ props.item.typeField }}
    </div>
    <div class="flex-1 text-sm font-medium text-black-600">
      {{ $dayjs(props.item.dateTimeField).format("llll") }}
    </div>
    <div class="flex-1 text-sm font-medium text-black-600">
      {{ props.item.description }}
    </div>
    <div class="flex-none">
      <PrimaryButton @click="onRegClicked(props?.item?.registration?.id)" color="blue">
        öffnen
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from "@/components/button/Primary.vue";

import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

import {useEventRegisterStore} from "@/modules/event/store/register.ts";

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
