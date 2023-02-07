<template>
  <ActionsList class="my-8" :actions="actionList" />
</template>

<script setup lang="ts">
import ActionsList from "@/components/actionlist/ActionsList.vue";

import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
  InboxIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  PencilSquareIcon,
  BuildingOfficeIcon,
} from "@heroicons/vue/24/outline";

const actionList = [
  {
    title: "Suche in alle Gruppen",
    description:
      "Du bekommst alle Gruppen des DPVs angezeigt und kannst dort Anträge stellen oder Mitglieder einsehen, wenn du die Rechte dazu hast.",
    link: "GroupSearch",
    icon: UserGroupIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Zeige meine Gruppen",
    description: "Zeige dir die Gruppen an, die du selbst erstellt hast.",
    link: "MyGroups",
    icon: BuildingStorefrontIcon,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-50",
  },
  {
    title: "Meine aktuellen persönlichen Daten einsehen ",
    description: "Du kannst deine persönlichen Daten einsehen.",
    link: "SettingsGeneral",
    icon: UserCircleIcon,
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
  },
  {
    title: "Meine aktuellen persönlichen Daten ändern ",
    description: "Du kannst deine persönlichen Daten ändern.",
    link: "SettingsGeneralEdit",
    icon: PencilSquareIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
  {
    title: "Meine offenen Aufgaben",
    description:
      "Du kannst deine noch zu erledigen Aufgaben einsehen und direkt erledigen.",
    link: "AllTasks",
    icon: BuildingOfficeIcon,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50",
  },
  {
    title: "Deine von dir gestellten Anträge einsehen",
    description:
      "Du kannst die Aufgaben ansehen die andere für dich erledigen sollen.",
    link: "MyRequestedTasks",
    icon: BuildingOfficeIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
];
</script>
