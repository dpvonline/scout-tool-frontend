<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <UserDetail />
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/base/PageWrapper.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import UserDetail from "@/modules/person/components/list/UserDetail.vue";

const pages = [{ name: "Alle User", link: { name: "AllUsers" } }];
</script>
