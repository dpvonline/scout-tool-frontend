<template>
  <ol
    role="list"
    class="
      overflow-hidden
      rounded-md
      lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200
    "
  >
    <li
      v-for="(step, stepIdx) in props.steps"
      :key="step.id"
      class="relative overflow-hidden lg:flex-1"
    >
      <div
        :class="[
          stepIdx === 0 ? 'border-b-0 rounded-t-md' : '',
          stepIdx === steps.length - 1 ? 'border-t-0 rounded-b-md' : '',
          'border border-gray-200 overflow-hidden lg:border-0',
        ]"
      >
        <router-link
          v-if="step.status === 'complete'"
          :to="{ name: step.link }"
          class="group"
        >
          <span
            class="
              absolute
              top-0
              left-0
              h-full
              w-1
              bg-transparent
              group-hover:bg-gray-200
              lg:bottom-0 lg:top-auto lg:h-1 lg:w-full
            "
            aria-hidden="true"
          />
          <span
            :class="[
              stepIdx !== 0 ? 'lg:pl-9' : '',
              'px-6 py-5 flex items-start text-sm font-medium',
            ]"
          >
            <span class="flex-shrink-0">
              <span
                class="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                "
              >
                <CheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </span>
            </span>
            <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
              <span class="text-sm font-medium">{{ step.name }}</span>
              <span class="text-sm font-medium text-gray-500">{{
                step.description
              }}</span>
            </span>
          </span>
        </router-link>
        <a
          v-else-if="step.status === 'current'"
          :href="step.href"
          aria-current="step"
        >
          <span
            class="
              absolute
              top-0
              left-0
              h-full
              w-1
              bg-blue-600
              lg:bottom-0 lg:top-auto lg:h-1 lg:w-full
            "
            aria-hidden="true"
          />
          <span
            :class="[
              stepIdx !== 0 ? 'lg:pl-9' : '',
              'px-6 py-5 flex items-start text-sm font-medium',
            ]"
          >
            <span class="flex-shrink-0">
              <span
                class="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border-2 border-blue-600
                "
              >
                <span class="text-blue-600">{{ step.id }}</span>
              </span>
            </span>
            <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
              <span class="text-sm font-medium text-blue-600">{{
                step.name
              }}</span>
              <span class="text-sm font-medium text-gray-500">{{
                step.description
              }}</span>
            </span>
          </span>
        </a>
        <a v-else :href="step.href" class="group">
          <span
            class="
              absolute
              top-0
              left-0
              h-full
              w-1
              bg-transparent
              group-hover:bg-gray-200
              lg:bottom-0 lg:top-auto lg:h-1 lg:w-full
            "
            aria-hidden="true"
          />
          <span
            :class="[
              stepIdx !== 0 ? 'lg:pl-9' : '',
              'px-6 py-5 flex items-start text-sm font-medium',
            ]"
          >
            <span class="flex-shrink-0">
              <span
                class="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border-2 border-gray-300
                "
              >
                <span class="text-gray-500">{{ step.id }}</span>
              </span>
            </span>
            <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
              <span class="text-sm font-medium text-gray-500">{{
                step.name
              }}</span>
              <span class="text-sm font-medium text-gray-500">{{
                step.description
              }}</span>
            </span>
          </span>
        </a>
        <template v-if="stepIdx !== 0">
          <!-- Separator -->
          <div
            class="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
            aria-hidden="true"
          >
            <svg
              class="h-full w-full text-gray-300"
              viewBox="0 0 12 82"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 0V31L10.5 41L0.5 51V82"
                stroke="currentcolor"
                vector-effect="non-scaling-stroke"
              />
            </svg>
          </div>
        </template>
      </div>
    </li>
  </ol>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/20/solid";
import { useRecipeStore } from "@/modules/recipe/store/index.ts";

const props = defineProps({
  steps: Array,
});
</script>