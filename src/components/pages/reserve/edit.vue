<template>
  <p>edit {{ reservationId }}</p>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const reservationId = route.params.id as string;
</script>
