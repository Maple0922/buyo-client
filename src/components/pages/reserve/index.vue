<template>
  <p v-if="date && time">reserve at {{ date }} {{ time }}:00 -</p>
  <p v-else>reserve</p>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const date = route.query.date as string;
const time = route.query.time as string;
</script>
