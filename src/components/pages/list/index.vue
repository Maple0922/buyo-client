<template>
  <v-row justify="end">
    <v-col>
      <v-btn
        color="indigo-darken-4"
        prepend-icon="mdi-calendar-today"
        variant="outlined"
        @click="shiftToday"
      >
        Today
      </v-btn>
    </v-col>
    <v-spacer />
    <v-col v-if="false">
      <v-btn-toggle
        v-model="type"
        rounded="md"
        color="indigo-darken-4"
        group
        mandatory
        border
        density="comfortable"
      >
        <v-btn value="d" @click="onChangeType">Daily</v-btn>
        <v-btn value="w" @click="onChangeType">Weekly</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="type === 'd'">
      <daily-timeline :day="day" @shift="shiftDate" />
    </v-col>
    <v-col v-else-if="type === 'w'">
      <p class="text-h6 font-weight-bold" v-for="(day, key) in days" :key="key">
        {{ formatDate(day.date, "M/D(ddd)") }}
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Day } from "@/types";
import axios from "axios";
import { formatDate } from "@/utils/dateFormatter";
import DailyTimeline from "./daily-timeline.vue";

const route = useRoute();
const router = useRouter();

const type = ref<"d" | "w">("d");
if (["d", "w"].includes(route.query.t as string)) {
  type.value = route.query.t as "d" | "w";
}

const onChangeType = () => {
  router.push({ query: { ...route.query, t: type.value } });
  fetchReservations();
};

const shiftDate = (diff: number): void => {
  page.value += diff;
  router.push({ query: { ...route.query, p: page.value } });
  fetchReservations();
};

const shiftToday = (): void => {
  if (page.value === 0) return;
  page.value = 0;
  router.push({ query: { ...route.query, p: page.value } });
  fetchReservations();
};

const page = ref<number>(0);
if (route.query.p !== undefined) {
  page.value = parseInt(route.query.p as string);
}

const days = ref<Day[]>([]);
const day = ref<Day>({
  date: "",
  reservations: [],
});

const fetchReservations = async () => {
  const { data } = await axios.get<Day[]>("/reserve", {
    params: {
      t: type.value,
      p: page.value,
    },
  });
  days.value = data;
  day.value = data[0];
};

onMounted(async () => {
  await fetchReservations();
});
</script>
