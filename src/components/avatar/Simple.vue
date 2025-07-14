<template>
  <span
    class="
    mx-auto
      inline-flex
      h-12
      w-12
      items-center
      justify-center
      rounded-full
      bg-gray-500
    "
  >
    <span class="font-medium leading-none text-white"> {{ getFirstName() }}</span>
  </span>
</template>

<script setup>
const props = defineProps({
  name: String,
});

function getFirstName() {
    return props.name.charAt(0)
}
</script>
