<template>
  <main
    class="
      relative
      h-screen
      z-10
      flex-1
      focus:outline-none
      overflow-y-auto
      pb-12
    "
  >
    <article class="flex-shrink-0 border border-gray-200 ma-12">
      <form v-if="!props.isLoading" class="space-y-8 divide-y px-3 py-4 divide-gray-200 xl:px-32">
        <div class="space-y-8 divide-y divide-gray-200">
          <h2 class="text-h1 font-medium text-gray-900">{{ props.header }}</h2>
          <div class="mt-1 grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <slot />
          </div>
        </div>

        <div class="pt-1 pb-12">
          <div class="flex justify-end" v-if="!isFinalStep">
            <PrimaryButton
              @click="onButtonClicked"
              label="weiter"
              :isLoading="isLoading"
            />
          </div>
          <div class="flex justify-end" v-if="isFinalStep">
            <PrimaryButton
              @click="onButtonClicked"
              label="speichern"
              :isLoading="isLoading"
            />
          </div>
        </div>
      </form>
      <div v-else> <LoadingItem/> </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Base from "@/components/field/Base.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import Success from "@/modules/common/components/Success.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const props = defineProps({
  header: { type: String, required: true },
  isFinalStep: { type: Boolean, required: false, default: false },
  isLoading : { type: Boolean, required: false, default: false },
});

const route = useRoute();

const fdcEnabled = ref(true);
const errors = ref([]);
const isLoading = ref(false);

const emit = defineEmits(["click"]);

const onButtonClicked = () => {
  emit("click");
};

import { useRouter } from "vue-router";
const router = useRouter();
</script>

