
  <template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ props.header }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            Such dir die passende Frage aus der Liste her. Wenn dir eine Frage
            fehlt schreibe eine
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500"
              >Fragen an uns senden senden</a
            >
          </p>
        </div>
        <div class="mt-12 lg:col-span-2 lg:mt-0">
          <dl class="space-y-12">
            <div v-for="faq in props.qas" :key="faq.question">
              <dt class="text-lg font-medium leading-6 text-gray-900">
                {{ faq.question }}
              </dt>
              <dd class="mt-2 text-base text-gray-500" v-html="faq.answer"></dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import {
  ChevronRightIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";

import Questions from "@/modules/landing/components/faq/Questions.vue";
import Header from "@/components/breadcrumbs/Header.vue";

const page = [{ name: "Hauptseite", link: "home" }];
import { useLandingStore } from "@/modules/landing/store/index";
const route = useRoute();

const ladingStore = useLandingStore();

const searchValue = ref();

const props = defineProps({
  qas: Array,
  header: String,
});


</script>
