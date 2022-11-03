<template>
<StepFrame
  header="Basis"
  @click="onNextButtonClicked"
  :isFinalStep="true"
  >
<h1>Basis</h1>
</StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import StepFrame from "@/components/stepper/StepFrame.vue"
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";


import { useRouter } from "vue-router";
const router = useRouter();

const errors = ref([]);


function onNextButtonClicked() {
}
</script>

