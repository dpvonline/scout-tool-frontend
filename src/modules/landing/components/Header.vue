<template>
  <div
    class="
      mx-auto
      max-w-7xl
      pt-10
      pb-24
      sm:pb-16
      lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-20 lg:px-8
    "
  >
    <div class="md:mx-8 px-6 lg:px-0 lg:pt-4">
      <div class="mx-auto max-w-2xl">
        <div class="max-w-lg">
          <img
            class="h-24 "
            src="./../../../assets/logo.png"
            alt="Your Company"
          />
          <div class="mt-12 sm:mt-24 lg:mt-16">
            <router-link :to="{ name: 'FaqMain' }" class="inline-flex space-x-6">
              <span
                class="
                  rounded-full
                  bg-blue-600/10
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  leading-6
                  text-blue-600
                  ring-1 ring-inset ring-blue-600/10
                "
                >Du hast Fragen?
              </span>
              <span
                class="
                  inline-flex
                  items-center
                  space-x-2
                  text-sm
                  font-medium
                  leading-6
                  text-gray-600
                "
              >
                <span>FAQs</span>
                <ChevronRightIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </router-link>
          </div>
          <h1
            class="
              mt-10
              text-3xl
              font-bold
              tracking-tight
              text-gray-800
              sm:text-5xl
            "
          >
            DPV Cloud
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Alles was sich der digitale Pfadfinder wünscht.
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <router-link
              :to="{ name: 'DashboardMain' }"
              class="
                inline-flex
                items-center
                rounded-md
                bg-blue-600
                px-6
                py-1.5
                text-base
                font-semibold
                leading-9
                text-white
                shadow-sm
                hover:bg-blue-500
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-blue-600
              "
            >
              <LockClosedIcon v-if="!isAuth" class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
               {{ !isAuth ? 'Anmelden' : 'Dashboard' }}
            </router-link>
            <router-link
              :to="{ name: 'RegisterStart' }"
              class="
                inline-flex
                items-center
                rounded-md
                bg-gray-100
                px-6
                py-1.5
                text-base
                font-semibold
                leading-9
                text-black
                shadow-sm
                hover:bg-gray-200
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-gray-200
              "
            >
              <PlusIcon class="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
              <span aria-hidden="true"> Registrieren </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen"
    >
      <div
        class="
          absolute
          inset-y-0
          right-1/2
          -z-10
          -mr-10
          w-[200%]
          skew-x-[-30deg]
          bg-white
          shadow-xl shadow-blue-600/10
          ring-1 ring-blue-50
          md:-mr-20
          lg:-mr-36
        "
        aria-hidden="true"
      />
      <img
        class="w-80 mx-auto border-solid border-2 border-black-200"
        src="./../../../assets/screenshot.jpg"
        alt="Your Company"
      />
    </div>
  </div>
  <div
    class="
      absolute
      inset-x-0
      bottom-0
      -z-10
      h-24
      bg-gradient-to-t
      from-white
      sm:h-32
    "
  />
</template>


<script setup lang="ts">
import { computed } from "vue";
import { ChevronRightIcon, LockClosedIcon, PlusIcon } from "@heroicons/vue/20/solid";
import { useAuthStore } from "@/modules/auth/store/index.ts";
const authStore = useAuthStore();

const isAuth = computed(() => {
  return authStore.isAuth;
});
</script>
