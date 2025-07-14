<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="relative bg-gray-800 pb-32">
      <div class="absolute inset-0">
        <img
          class="h-full w-full object-cover"
        src="./../../../assets/background1.jpg"
          alt=""
        />
        <div
          class="absolute inset-0 bg-gray-400 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div class="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
        <h1
          class="
            text-4xl
            font-bold
            tracking-tight
            text-white
            md:text-5xl
            lg:text-6xl
          "
        >
          Ein Account für Alles
        </h1>
        <p class="mt-6 max-w-3xl text-xl text-gray-300">
          Mit deinem DPV-Account hast du die Möglichkeit duzende Anwendungen zu verwenden. 
        </p>
      </div>
    </div>

    <!-- Overlapping cards -->
    <section
      class="relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-32 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <h2 class="sr-only" id="contact-heading">Contact us</h2>
      <div
        class="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8"
      >
        <div
          v-for="link in supportLinks"
          :key="link.name"
          class="flex flex-col rounded-2xl bg-white shadow-xl"
        >
          <div class="relative flex-1 px-6 pt-16 pb-8 md:px-8">
            <div
              class="
                absolute
                top-0
                inline-block
                -translate-y-1/2
                transform
                rounded-xl
                bg-blue-600
                p-5
                shadow-lg
              "
            >
              <component
                :is="link.icon"
                class="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h3 class="text-xl font-medium text-gray-900">{{ link.name }}</h3>
            <p class="mt-4 text-base text-gray-500">{{ link.description }}</p>
          </div>
          <div class="rounded-bl-2xl rounded-br-2xl bg-gray-50 p-6 md:px-8">
            <a
              :href="link.href"
              class="
                text-base
                font-medium
                text-blue-700
                hover:text-blue-600
              "
              >öffnen<span aria-hidden="true"> &rarr;</span></a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  CloudIcon,
  CalendarIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";

const supportLinks = [
  {
    name: "Wiki",
    href: "https://wiki.dpvonline.de",
    description:
      "Zentrale Informations Plattform um einfach und schnell alle Informationen zu speichern.",
    icon: InformationCircleIcon,
  },
  {
    name: "Cloud",
    href: "https://cloud.dpvonline.de",
    description:
      "Du kannst alle deine Pfadfinderdaten zentral und einfach sichern und teilen.",
    icon: CloudIcon,
  },
  {
    name: "Veranstaltungen",
    href: "https://dpvonline.cloud",
    description:
      "Einfache Art deine Veranstaltungen zu planen und zu verwalten. Deine Mitglieder können sich Anmelden und sich über alle Neuigkeiten informieren.",
    icon: CalendarIcon,
  },
];
</script>