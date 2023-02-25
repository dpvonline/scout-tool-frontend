<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        class="
          h-10
          w-10
          rounded-full
          flex
          items-center
          justify-center
          ring-8 ring-white
        "
        :class="[getGroupIconColor(props.item)]"
      >
        <UserGroupIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-gray-800">
          {{ props.item.name }}
        </p>
        <p class="truncate text-sm font-medium text-gray-500">
          <span
            v-if="
              props.item.parent &&
              props.item.parent.parent &&
              props.item.parent.parent.parent
            "
          >
            {{ props.item.parent.parent.parent.name }} -
          </span>
          <span v-if="props.item.parent && props.item.parent.parent">
            {{ props.item.parent.parent.name }} -
          </span>
          <span v-if="props.item && props.item.parent">
            {{ props.item.parent.name }}
          </span>
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          <BuildingLibraryIcon
            v-if="props.item.scouthierarchy"
            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <span v-if="props.item.scouthierarchy" class="truncate">{{
            props.item.scouthierarchy.levelChoice
          }}</span>
          <span v-else class="truncate"></span>
        </p>
        <div>
          <p
            v-if="props.item?.isMember"
            class="mt-2 flex items-center text-sm text-gray-500"
          >
            {{ props.item?.isMember ? "Mitglied" : "kein Mitglied" }}
            <span
              class="px-1"
              v-if="props.item?.permission && props.item?.permission !== 'none'"
            >
              und {{ props.item?.permission ? props.item?.permission : "" }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ClipboardIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  Cog8ToothIcon,
  BuildingLibraryIcon,
} from "@heroicons/vue/24/outline";
import moment from "moment";
const props = defineProps({
  item: Object,
});

function getGroupIconColor(item) {
  let color = "bg-gray-400";
  if (item.isMember) {
    color = "bg-blue-600";
  }
  if (item.permission === "Ansicht") {
    color = "bg-orange-400";
  }
  if (item.permission === "Administrator") {
    color = "bg-red-600";
  }

  return color;
}
</script>
