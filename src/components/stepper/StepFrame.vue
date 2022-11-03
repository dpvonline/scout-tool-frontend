<template>
  <main
    class="
      relative
      h-screen
      z-40
      flex-1
      focus:outline-none
      overflow-y-auto
      pb-12
    "
  >
    <article class="flex-shrink-0 border border-gray-200 ma-12">
      <form class="space-y-8 divide-y px-3 py-4 divide-gray-200 xl:px-32">
        <div class="space-y-8 divide-y divide-gray-200">
          <h2 class="text-h1 font-medium text-gray-900">{{ props.header }}</h2>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <slot />
          </div>
        </div>

        <div class="pt-5 pb-12">
          <div class="flex justify-end" v-if="!isFinalStep">
            <PrimaryButton
              @click="onButtonClicked"
              label="Weiter"
              :isLoading="isLoading"
            />
          </div>
          <div class="flex justify-end" v-if="isFinalStep">
            <PrimaryButton
              @click="onButtonClicked"
              label="Speichern"
              :isLoading="isLoading"
            />
          </div>
        </div>
      </form>
    </article>
  </main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Base from "@/components/field/Base.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import Success from "@/modules/common/components/Success.vue";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const props = defineProps({
  header: { type: String, required: true },
  isFinalStep: { type: Boolean, required: false, default: false },
});

const route = useRoute();

const fdcEnabled = ref(true);
const errors = ref([]);
const isLoading = ref(false);

const emit = defineEmits(["click"]);

const onButtonClicked = () => {
  emit("click");
};

const ingredientStore = useIngredientStore();

import { useRouter } from "vue-router";
const router = useRouter();
</script>

