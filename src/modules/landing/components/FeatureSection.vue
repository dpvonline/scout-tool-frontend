<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2
          class="text-lg font-semibold leading-8 tracking-tight text-blue-600"
        >
          Zentral und Sicher.
        </h2>
        <p
          class="
            mt-2
            text-3xl
            font-bold
            tracking-tight
            text-gray-900
            sm:text-4xl
          "
        >
          Viele Funktionen
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Wir bieten wir einen Accout mit dem du alles tun kannst. Datenschutz hat dabei den höchsten Stellenwert.
          Es gibt nur einen gesicherten Ort an dem deine Daten gespeichert. Wir reduzieren E-Mails, Excellisten und Papier.
          Deine Daten können damit zentral geändert und gelöscht werden.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl
          class="
            grid
            max-w-xl
            grid-cols-1
            gap-y-10 gap-x-8
            lg:max-w-none lg:grid-cols-2 lg:gap-y-16
          "
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="relative pl-16"
          >
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div
                class="
                  absolute
                  top-0
                  left-0
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-600
                "
              >
                <component
                  :is="feature.icon"
                  class="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/vue/24/outline";

const features = [
  {
    name: "Datenschutz",
    description:
      "Wir nehmen Datenschutz ernst und achten auf die einhaltung aller Regeln und Gesetze.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Mobil",
    description:
      "Alle Anwendungen sind komplett auf Mobilen Geräten verfügbar.",
    icon: LockClosedIcon,
  },
  {
    name: "Zuverlässig",
    description:
      "Wir bieten dir Top Qualität und einen guten Service.",
    icon: ArrowPathIcon,
  },
  {
    name: "Einfach",
    description:
      "Wir versuchen deine Prozesse so schnell und einfach wie möglich zu gestalten.",
    icon: FingerPrintIcon,
  },
];
</script>