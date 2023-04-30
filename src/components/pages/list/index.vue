<template>
  <v-row justify="end">
    <v-spacer />
    <v-col>
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
      <p class="text-h6 font-weight-bold">
        {{ formatDate(day.date, "YYYY年M月D日 (ddd)") }}
      </p>
      <v-timeline side="end">
        <v-timeline-item
          v-for="reservation in day.reservations"
          :key="reservation.id"
          dot-color="indigo"
          icon="mdi-calendar-account"
          fill-dot
          size="small"
          width="200"
        >
          <template #opposite>
            <span class="text-caption font-weight-bold"
              >{{
                formatDate(`${day.date} ${reservation.time.start}:00`, "H:mm")
              }}
              -
              {{
                formatDate(`${day.date} ${reservation.time.end}:00`, "H:mm")
              }}</span
            >
          </template>
          <v-card elevation="3">
            <v-card-title class="text-body-2">
              {{ reservation.name }}
            </v-card-title>
            <v-card-actions>
              <v-row>
                <v-spacer />
                <v-col>
                  <v-btn
                    icon="mdi-pencil"
                    variant="tonal"
                    density="compact"
                    color="warning"
                  />
                  <v-btn
                    icon="mdi-delete"
                    variant="tonal"
                    density="compact"
                    color="red-darken-1"
                  />
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <v-col v-else-if="type === 'w'"> 週ごと </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Day } from "@/types";
import axios from "axios";
import { formatDate } from "@/utils/dateFormatter";

const route = useRoute();
const router = useRouter();

const type = ref<"d" | "w">("d");
if (["d", "w"].includes(route.query.t as string)) {
  type.value = route.query.t as "d" | "w";
}

const onChangeType = () =>
  router.push({ query: { ...route.query, t: type.value } });

const page = ref<number>(0);
if (route.query.p !== undefined) {
  page.value = parseInt(route.query.p as string);
}

const days = ref<Day[]>([]);
const day = ref<Day>({
  date: "",
  reservations: [],
});

onMounted(async () => {
  const { data } = await axios.get<Day[]>("/reserve", {
    params: {
      t: type.value,
      p: page.value,
    },
  });
  days.value = data;
  day.value = data[0];

  // set query params "type"
});
</script>
