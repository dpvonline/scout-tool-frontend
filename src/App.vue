<template>
  <div class="flex h-full">
    <LeftNav>
      <router-view />
    </LeftNav>
    <Success/>
    <Error/>
  </div>
</template>

<script setup lang="ts">
import LeftNav from "@/modules/app/components/LeftNav.vue";
import Success from "@/modules/common/components/Success.vue";
import Error from "@/modules/common/components/Error.vue";
</script>