<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField
      component="Text"
      :label="'Scoutname'"
      techName="scoutname"
      v-model="state.scoutname"
      :errors="errors.scoutname?.$errors"
    />
    <BaseField
      component="Number"
      :label="'Scout Group'"
      techName="scoutgroup"
      v-model="state.scoutgroup"
      :errors="errors.scoutgroup?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Bundespost'"
      techName="bundespost"
      v-model="state.bundespost"
      :errors="errors.bundespost?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Leader'"
      techName="leader"
      v-model="state.leader"
      :errors="errors.leader?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Scout level'"
      techName="scoutlevel"
      v-model="state.scoutlevel"
      :errors="errors.scoutlevel?.$errors"
    />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { RegisterScoutDetails } from "./types";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "../../store";

const state = reactive<RegisterScoutDetails>({
  scoutName: "",
  scoutOrganisation: 0,
  bundespost: "",
  leader: "",
  scoutLevel: "",
});

const rules = {
  scoutname: {
    required,
  },
  scoutgroup: {
    required,
  },
  bundespost: {
    required,
  },
  leader: {
    required,
  },
  scoutlevel: {
    required,
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref([]);

const commonStore = useCommonStore();

const registerStore = useRegisterStore();

function onNextButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  console.log(errors.value);
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  registerStore.updateScoutDetails(state);
  router.push({
    name: "RegisterPersonalDetails",
  });
}
</script>
