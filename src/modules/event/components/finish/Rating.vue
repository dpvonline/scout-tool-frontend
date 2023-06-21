<template>
  <div>
    <div class="my-3" v-if="!sent">
      <h1>Deine Bewertung</h1>
      <button
        v-for="item in items"
        :key="item"
        type="button"
        class="p-2 w-15 h-15"
        :class="item <= currentStar ? 'text-yellow-400' : 'text-gray-200'"
        @mouseover="mouseOver(item)"
        @click="onClicked(item)"
        @touchstart="mouseOver(item)"
      >
        <StarIcon class="h-7 w-7" aria-hidden="true" />
      </button>
      <div v-if="currentStar !== 0">
        <label
          for="comment"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Dein Kommentar an uns</label
        >
        <div class="mt-2">
          <textarea
            v-model="comment"
            rows="4"
            name="comment"
            id="comment"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div class="flex-shrink-0">
          <button
            @click="onSubmitClicked"
            class="inline-flex items-center rounded-md bg-blue-600 px-3 my-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Absenden
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Danke für deine Meinung!</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from "@heroicons/vue/20/solid";
import { reactive, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

const items = [1, 2, 3, 4, 5];

let currentStar = ref(0);
let comment = ref("");
let sent = ref(false);

function onClicked(value) {
  currentStar.value = value;
}

function mouseOver(value) {
  currentStar.value = value;
}

function onSubmitClicked() {
  const regId = route.params.id;
  eventRegisterStore
    .createRating(regId, {
      registration: regId,
      rating: currentStar.value,
      text: comment.value,
    })
    .then((response) => {
      commonStore.showSuccess("Comment wurde erfolgreich erstellt");
      sent.value = true;
    });
}
</script>
