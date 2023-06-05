<template>
  <div class="flex flex-1 w-full  py-5">
    <div class="flex mr-2 sm:mr-0 gap-x-4">
      <BanknotesIcon
        class="h-6 w-6 flex-none rounded-full"
        :class="[props.item.amount > 0 ? 'text-green-500' : 'text-red-500']"

        alt=""
      />
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">
          {{ props.item?.amount }} €
        </p>
        <p class="mt-1 flex text-xs leading-5 text-gray-500">
        </p>
      </div>
    </div>
    <div class="grow items-center gap-x-6">
      <div class="sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900">Buchung</p>
        <p class="text-xs text-black">{{ props?.item?.transferSubject }}</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ $dayjs(props.item.transferDate).format("llll") }}                             
        </p>
        <div class="mt-1 flex items-center gap-x-1.5">
          <p class="text-xs leading-5 text-gray-500">{{ props?.item?.description }}</p>
        </div>
      </div>
    </div>
    <div class="grow items-center gap-x-6">
      <div class="sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900">Eingetragen vom {{ props?.item?.transferPerson?.firstName }}</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          am {{ $dayjs(props.item.createdAt).format("llll") }}                             
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PencilIcon,
  CalendarIcon,
  PencilSquareIcon,
  PlusIcon,
  QueueListIcon,
  AdjustmentsVerticalIcon,
  PlusCircleIcon,
  CpuChipIcon,
  ArrowSmallUpIcon,
  UserCircleIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  item: Object,
});

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";

const person = {
  name: "Leslie Alexander",
  email: "leslie.alexander@example.com",
  role: "Co-Founder / CEO",
  imageUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  href: "#",
  lastSeen: "3h ago",
  lastSeenDateTime: "2023-01-23T13:23Z",
};
</script>
