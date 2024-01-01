<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <div class="lg:border-t lg:border-b lg:border-gray-200">
      <nav
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:py-8"
        aria-label="Progress"
      >
        <h1 class="text-xl font-semibold text-gray-900">Excel Importieren</h1>
        <p class="mt-2 text-sm">
          Hier kannst du eine Excel-Datei hochladen, um Personen zu importieren.
          Die Datei muss eine bestimmte Struktur haben, damit sie importiert
          werden kann.
          <a class="font-bold text-blue-600" href="">Hier</a> findest du eine
          Vorlage, die du verwenden kannst.
          <br />
          <br />
          <b>Wichtig:</b> Die Datei darf nicht mehr als 150 Zeilen haben.
          <br />
          <br />
        </p>
        <div v-if="isReadyToUpload">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
            >Excel Personen-Liste</label
          >
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept=".xlsx"
            @change="handleFileUpload"
          />
          <p
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            xlsx-Datei auswählen (max. 150 Zeilen)
          </p>
        </div>
        <div v-else>
          <p v-if="isLoading" class="text-sm font-medium">
            <span class="text-blue-600">Excel wird importiert...</span>
          </p>
          <div v-else>
            <p class="text-md font-medium">
              Personen im Datensatz: {{ responseData?.totalCount }} Personen
            </p>
            <p class="text-md font-medium">
              Erfolgreich importiert: {{ responseData?.successCount }} Personen
            </p>
            <p class="text-md font-medium">Fehlermeldung:</p>
            <p v-for="error in responseData?.report" class="text-sm">
              {{ error }}
            </p>
            <button
              class="text-blue-600 mx-3 my-2"
              @click="$router.push({ name: 'AllPersons' })"
            >
              Alle Personen anzeigen
            </button>
            <button class="text-blue-600 mx-3 my-2" @click="$router.go(0)">
              Neue Excel Liste hochladen
            </button>
          </div>
        </div>
      </nav>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { usePersonStore } from "@/modules/person/store";
import { useCommonStore } from "@/modules/common/store";
import { computed, onMounted } from "vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

const personStore = usePersonStore();
const commonStore = useCommonStore();

const isReadyToUpload = ref(true);
const isLoading = ref(false);
const responseData = ref({});

function handleFileUpload(event: any) {
  isLoading.value = true;
  isReadyToUpload.value = false;
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  personStore.uploadPeronsExcelSheet(formData).then((response: any) => {
    if (response.status == 200) {
      commonStore.showSuccess("Excel erfolgreich importiert");
      isLoading.value = false;
      responseData.value = response.data;
    } else {
      console.log(response?.data);
      commonStore.showError(response?.data?.detail);
      isLoading.value = false;
    }
  });
}

const pages = [{ name: "Alle Personen", link: { name: "PersonMain" } }];
</script>
