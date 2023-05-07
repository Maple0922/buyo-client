<template>
  <div class="timeline">
    <div class="timeline__header">
      <v-btn
        variant="text"
        density="comfortable"
        color="indigo-darken-4"
        @click="shift(-1)"
        icon="mdi-chevron-left"
      />
      <p class="header__title">
        {{ formatDate(props.day.date, "YYYY年M月D日 (ddd)") }}
      </p>
      <v-btn
        variant="text"
        density="comfortable"
        color="indigo-darken-4"
        @click="shift(1)"
        icon="mdi-chevron-right"
      />
    </div>
    <div class="timeline__main">
      <div class="main__left">
        <p class="main__left__time" v-for="time in times" :key="time">
          {{ time }}:00
        </p>
      </div>
      <div class="main__center" @click="onClickTimeline">
        <div class="main__center__line" v-for="time in times" :key="time"></div>
      </div>
      <div class="main__reservations">
        <span
          class="main__reservations__item"
          v-for="reservation in props.day.reservations"
          :key="reservation.id"
          :style="generateReservationStyle(reservation)"
          @click="onClickReservation(reservation)"
        >
          <span class="main__reservations__item__inner">
            <p class="main__reservations__item__name">{{ reservation.name }}</p>
            <p class="main__reservations__item__time">
              {{ reservation.time.start }} - {{ reservation.time.end }}
            </p>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { Day } from "@/types";
import { formatDate } from "@/utils/dateFormatter";
import { Reservation } from "@/types";
import { useRouter } from "vue-router";

const props = defineProps<{ day: Day }>();
const emits = defineEmits<{ (e: "shift", diff: number): void }>();

const shift = (diff: number): void => {
  emits("shift", diff);
};

const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

const router = useRouter();

const onClickReservation = (reservation: Reservation) => {
  router.push({ name: "reserve.edit", params: { id: reservation.id } });
};

const onClickTimeline = (e: any) => {
  const date = props.day.date;
  // const time = Math.floor(e.layerY / 24) / 2 + 8; // 30分ごとに見る場合
  const time = Math.floor(e.layerY / 48) + 8; // 1時間ごとに見る場合
  router.push({ name: "reserve", query: { date, time } });
};

const generateReservationStyle = (reservation: Reservation) => {
  const start = reservation.time.start;
  const end = reservation.time.end;
  const startHour =
    Number(start.split(":")[0]) + Number(start.split(":")[1]) / 60;
  const endHour = Number(end.split(":")[0]) + Number(end.split(":")[1]) / 60;
  const top = (startHour - 8) * 48 + 1;
  const height = (endHour - startHour) * 48 - 1;
  return {
    top: `${top}px`,
    height: `${height}px`,
  };
};
</script>

<style lang="scss" scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__main {
    display: flex;
    gap: 8px;
    position: relative;
  }
}
.header {
  &__title {
    font-size: 1rem;
    font-weight: bold;
  }
}

.main {
  &__left {
    width: 36px;
    &__time {
      height: 48px;
      text-align: right;
      position: relative;
      font-size: 12px;
      top: -8px;
      color: #666;
      font-weight: bold;
    }
  }
  &__center {
    width: calc(100% - 72px);
    &__line {
      height: 48px;
      border-top: 1px solid #ccc;
    }
  }
  &__reservations {
    position: absolute;
    top: 0;
    left: 44px;
    width: calc(100% - 72px);
    &__item {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 1px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &__inner {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
        width: 100%;
        height: 100%;
        background-color: #2431d0cc;
        border-radius: 4px;
        padding: 2px 8px;
      }
      &__name {
        font-size: 12px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: white;
      }
      &__time {
        font-size: 12px;
        font-weight: bold;
        color: white;
      }
    }
  }
}
</style>