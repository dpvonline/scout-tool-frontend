<template>
  <div>
    <BaseField
      component="Currency"
      label="Zahlung"
      techName="amount"
      v-model="state.amount"
      :errors="errors.amount?.$errors"
    />
    <BaseField
      component="Text"
      label="Verwendungszweck"
      techName="transferSubject"
      v-model="state.transferSubject"
      :errors="errors.transferSubject?.$errors"
    />
    <BaseField
      component="DateTime"
      label="Buchungsdatum"
      techName="transferDate"
      v-model="state.transferDate"
      :errors="errors.transferDate?.$errors"
    />
    <!-- <BaseField
      component="Text"
      label="transferPerson"
      techName="Überwiesen von"
      v-model="state.transferPerson"
      :errors="errors.transferPerson?.$errors"
    /> -->
    <!-- <BaseField
      component="Text"
      label="Refere"
      techName="transferReferenceId"
      v-model="state.transferReferenceId"
      :errors="errors.transferReferenceId?.$errors"
    /> -->
    <BaseField
      component="TextArea"
      label="Kommentar"
      techName="description"
      v-model="state.description"
      :errors="errors.description?.$errors"
    />
    <PrimaryButton
      v-if="!isEdit"
      class="mx-2"
      color="blue"
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Buchung hinzufügen"
    />
    <PrimaryButton
      v-if="isEdit"
      class="mx-2"
      color="blue"
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Buchung ändern"
    />
    <PrimaryButton
      v-if="isEdit"
      class="mx-2"
      color="red"
      @click="onDeleteClicked"
      :isLoading="!!isLoading"
      label="Buchung löschen"
    />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();
import dayjs from "dayjs";
dayjs.locale("de");

import { reactive, onMounted, ref, watch, computed } from "vue";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useMessageStore } from "@/modules/message/store/index";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const state = reactive({
  id: null,
  amount: 0.0,
  transferSubject: "Test",
  transferDate: null,
  description: "",
  transferPerson: null,
  transferReferenceId: null,
});

const rules = {
  amount: {
    required,
  },
  transferSubject: {
    required,
  },
  transferDate: {
    required,
  },
};

const isAuth = computed(() => {
  return authStore.isAuth;
});

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  isLoading.value = true;

  if (!isEdit.value) {
    eventStore
      .createPayment({
        amount: state.amount,
        transferSubject: state.transferSubject,
        transferDate: state.transferDate,
        transferPerson: state.transferPerson,
        transferReferenceId: state.transferReferenceId,
        description: state.description,
        registration: props?.items?.id,
      })
      .then((response) => {
        if (response && response.status === 201) {
          goToRoute(response.data.id);
          commonStore.showSuccess("Zahlung erfolgreich eingetragen");
        } else if (response && response.status === 400) {
          commonStore.showSuccess(
            `Die Anfrage ist Fehlerhaft.${response.data}`
          );
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  } else {
    eventStore
      .updatePayment({
        id: state.id,
        amount: state.amount,
        transferSubject: state.transferSubject,
        transferDate: state.transferDate,
        transferPerson: state.transferPerson.id,
        transferReferenceId: state.transferReferenceId,
        description: state.description,
        registration: props?.items?.registration,
      })
      .then((response) => {
        if (response && response.status === 200) {
          goToRoute(response.data.id);
          commonStore.showSuccess("Zahlung erfolgreich geändert");
        } else if (response && response.status === 400) {
          commonStore.showSuccess(
            `Die Anfrage ist Fehlerhaft.${response.data}`
          );
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  isLoading.value = true;
}

function onDeleteClicked() {
  isLoading.value = true;
  eventStore.deletePayment(state.id).then((response) => {
    goToRoute(response.data.id);
  });
}

function goToRoute(id: any) {
  router.go(router.currentRoute.value);
}

import { useRoute } from "vue-router";
const route = useRoute();

import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  items: Object,
});

function setInitData(item) {
  isLoading.value = true;
  if (!isEdit.value) {
    state.amount = item?.payment?.open.toFixed(2).replace(".", ",").trim();
    state.transferSubject = item.refId;
    state.transferDate = dayjs().locale("de").format("YYYY-MM-DDTHH:mm");
    state.description = item.description;
  } else {
    state.id = item?.id;
    state.amount = item?.amount?.toString().replace(".", ",");
    state.transferPerson = item.transferPerson;
    state.transferReferenceId = item.transferReferenceId;
    state.transferSubject = item?.transferSubject;
    state.transferDate = dayjs(item?.transferDate)
      .locale("de")
      .format("YYYY-MM-DDTHH:mm");
    state.description = item.description;
  }

  isLoading.value = false;
}

const isEdit = computed(() => {
  return !!props.items.id && !props.items.refId;
});

onMounted(() => {
  setInitData(props.items);
});
</script>
