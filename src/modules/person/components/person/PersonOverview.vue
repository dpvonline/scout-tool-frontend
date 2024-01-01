<template>
  <div class="mx-6 my-4">
    <!-- Profile -->
    <div v-if="props.person?.user?.username" class="border-b border-gray-200 px-4 py-5 sm:px-6">
      <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
        Benutzerdaten
      </h3>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Nutzername
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow text-gray-400">{{
                props.person?.user?.username
              }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">E-Mail-Adresse</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.person?.user?.email }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Contact -->
    <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
      <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
        Persönliche Daten
      </h3>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow"
                >{{ props.person.displayName }}</span
              >
            </dd>
          </div>
          <div
            class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
          >
            <dt class="text-sm font-medium text-gray-500">Geschlecht</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.person?.gender }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Geburtsdatum</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">
                {{
                  props.person?.birthday
                    ? moment(props.person?.birthday).format("DD.MM.YYYY")
                    : "Nicht angegeben"
                }}
              </span>
            </dd>
          </div>
          <div v-if="props.person?.phoneNumber" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Telefonnummer</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.person?.phoneNumber || "Noch keine Telefonnummer"
              }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Adresse</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.person?.address || "Noch keine Adresse"
              }}</span>
            </dd>
          </div>
          <div v-if="props.person?.addressSupplement" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Adresszusatz</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.person?.addressSupplement ||
                "Noch keine Adresszusatz"
              }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Postleitzahl & Ort
            </dt>
            <dd
              class="mt-1 flex flex-grow text-sm text-gray-900 sm:col-span-2 sm:mt-0"
            >
              <span
                >{{ props.person?.zipCode?.zipCode || "Keine Postleitzahl" }}
                {{ props.person?.zipCode?.city || "" }}</span
              >
            </dd>
          </div>
        </dl>
      </div>
    </div>

  <!-- Scout Data -->
  <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
      <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
        Pfadfinder Daten
      </h3>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Stamm</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div class="flex justify-between group">
                <span>
                  {{ props.person?.scoutGroup?.name || "Kein Stamm ausgewählt." }}
                </span>
              </div>
            </dd>
          </div>
          <div v-if="props.person?.scoutName" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Fahrten-Name</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.person?.scoutName }}</span>
            </dd>
          </div>
          <!-- <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Position</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.person?.leader }}</span>
            </dd>
          </div> -->
        </dl>
      </div>
    </div>

    <div class="px-4 py-5 sm:px-6">
      <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
        Essensgewohnheiten
      </h3>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">
              Deine Essgewohnheiten
            </dt>
            <dd v-if="props.person?.eatHabits?.length > 0" class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.person?.eatHabits
                  ?.map((item) => item.name)
                  .join(", ") || "-"
              }}</span>
            </dd>
            <dd v-else class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow"> Diese Person isst alles.</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { useRoute } from "vue-router";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const personalDataStore = usePersonalDataStore();

const props = defineProps({
  person: Object,
  editable: Boolean,
});
</script>
