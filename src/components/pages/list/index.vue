<template>
  <v-row justify="end">
    <v-col>
      <v-btn
        color="indigo-darken-4"
        prepend-icon="mdi-calendar-today"
        variant="outlined"
        @click="shiftToday"
        height="38"
      >
        Today
      </v-btn>
    </v-col>
    <v-spacer />
    <v-col>
      <v-btn-toggle
        v-model="type"
        rounded="md"
        color="indigo-darken-4"
        group
        mandatory
        divided
        border
        density="comfortable"
      >
        <v-btn value="d" size="small" @click="onChangeType">Daily</v-btn>
        <v-btn value="w" size="small" @click="onChangeType">Weekly</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="type === 'd'">
      <daily-timeline :day="day" @shiftDay="shiftDay" />
    </v-col>
    <v-col v-else-if="type === 'w'">
      <weekly-timeline :days="days" @shiftWeek="shiftWeek" />
    </v-col>
  </v-row>
  <snackbar />
</template>

<script lang="ts" setup>
import { onMounted, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import DailyTimeline from "./daily-timeline.vue";
import WeeklyTimeline from "./weekly-timeline.vue";
import Snackbar from "./snackbar.vue";

import { RangeType } from "@/types";
import { key, useProvide } from "./provider";

const provider = useProvide();
provide(key, provider);
const { fetchReservations, days, day, type, page } = provider;

const route = useRoute();
const router = useRouter();

if (["d", "w"].includes(route.query.t as string)) {
  type.value = route.query.t as RangeType;
}

if (route.query.p !== undefined) {
  page.value = parseInt(route.query.p as string);
}

const onChangeType = () => {
  router.push({ query: { ...route.query, t: type.value } });
  fetchReservations();
};

const shiftDay = (diff: number): void => {
  page.value += diff;
  router.push({ query: { ...route.query, p: page.value } });
  fetchReservations();
};

const shiftWeek = (diff: number): void => {
  page.value += diff;
  router.push({ query: { ...route.query, p: page.value } });
  fetchReservations();
};

const shiftToday = (): void => {
  if (page.value === 0 && type.value === "d") return;
  type.value = "d";
  page.value = 0;
  router.push({ query: { ...route.query, p: page.value } });
  fetchReservations();
};

onMounted(async () => {
  console.log(route.query);

  type.value = (route.query.t as RangeType) || "d";
  fetchReservations();
});
</script>
