<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main>
      <article class="px-2">
       <NewMessageFormIntern />
      </article>
    </main>
  </PageWrapper>
</template>


<script setup lang="ts">
import { reactive, onMounted, computed, ref } from "vue";
import Base from "@/components/field/Base.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import Success from "@/modules/common/components/Success.vue";
import { useMessageStore } from "@/modules/message/store";
import NewMessageFormIntern from "@/modules/message/components/NewMessageFormIntern.vue";
import { useRoute } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const route = useRoute();

const pages = computed(() => {
  return [{ name: "Alle Nachrichten", link: "MessageMain", current: false }];
});

</script>
