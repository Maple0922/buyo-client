<template>
  <v-container class="timeline">
    <div class="timeline__header">
      <div class="timeline__header__left">
        <v-btn
          variant="text"
          density="comfortable"
          color="indigo-darken-4"
          @click="shiftWeek(-1)"
          icon="mdi-chevron-left"
        />
      </div>
      <p class="header__title">
        <span v-if="!isLoading">{{ displayDateRange }} </span>
      </p>
      <div class="timeline__header__right">
        <v-btn
          variant="text"
          density="comfortable"
          color="indigo-darken-4"
          @click="shiftWeek(1)"
          icon="mdi-chevron-right"
        />
      </div>
    </div>
    <div class="timeline__table-header">
      <div class="table-header__left">
        <p class="table-header__left__month">
          {{ formatDate(props.days[0]?.date, "M") }}
        </p>
      </div>
      <div class="table-header__center">
        <div
          class="table-header__center__date"
          v-for="day in props.days"
          :key="day.date"
          :style="weekendColorStyle(day.date)"
          @click="moveToDaily(day.date)"
        >
          <p class="table-header__center__date__day">
            {{ formatDate(day.date, "D") }}
          </p>
          <p class="table-header__center__date__week">
            （{{ formatDate(day.date, "ddd") }}）
          </p>
        </div>
      </div>
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
      <div
        class="main__reservations"
        v-for="(day, index) in props.days"
        :key="day.date"
      >
        <span
          class="main__reservations__item"
          v-for="reservation in day.reservations"
          :key="reservation.id"
          :style="generateReservationStyle(reservation, index)"
          @click="onClickReservation(reservation, day.date)"
        >
          <span class="main__reservations__item__inner">
            <p class="main__reservations__item__name">{{ reservation.name }}</p>
            <p class="main__reservations__item__time">
              {{ reservation.time.start.split(":")[0] }}-{{
                reservation.time.end.split(":")[0]
              }}
            </p>
          </span>
        </span>
      </div>
    </div>
  </v-container>
  <create-dialog />
  <edit-dialog />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
import { Day } from "@/types";
import { formatDate } from "@/utils/dateFormatter";
import { Reservation } from "@/types";

import CreateDialog from "./dialogs/create.vue";
import EditDialog from "./dialogs/edit.vue";

import { strictInject } from "@/utils/strictInject";
import { key } from "@/components/pages/list/provider";

const {
  clickedRow,
  dialogVisible,
  createForm,
  editForm,
  createRange,
  editRange,
  isLoading,
} = strictInject(key);

const props = defineProps<{ days: Day[] }>();
const emits = defineEmits<{
  (e: "shiftWeek", diff: number): void;
  (e: "moveToDaily", date: string): void;
}>();

const shiftWeek = (diff: number): void => {
  emits("shiftWeek", diff);
};

const moveToDaily = (date: string): void => {
  emits("moveToDaily", date);
};

const times = Array.from({ length: 15 }, (_, i) => i + 8);

const displayDateRange = computed(() => {
  if (props.days.length === 0) return "";
  const startDate = props.days[0].date;
  const endDate = props.days[props.days.length - 1].date;
  if (formatDate(startDate, "M") === formatDate(endDate, "M"))
    return `${formatDate(startDate, "YYYY年M月D日")} - ${formatDate(
      endDate,
      "D日"
    )}`;
  if (formatDate(startDate, "YYYY") === formatDate(endDate, "YYYY"))
    return `${formatDate(startDate, "YYYY年M月D日")} - ${formatDate(
      endDate,
      "M月D日"
    )}`;
  return `${formatDate(startDate, "YYYY年M月D日")} - ${formatDate(
    endDate,
    "YYYY年M月D日"
  )}`;
});

const onClickTimeline = (e: any) => {
  const dayIndex = Math.floor((e.offsetX / e.currentTarget.offsetWidth) * 7);

  const date = props.days[dayIndex].date;
  const time = Math.floor(e.layerY / 48) + 8;
  if (!date || time < 8 || time >= 22) return;
  Object.assign(clickedRow, { date, time });

  createRange.value = time === 21 ? 1 : 2;

  Object.assign(createForm, {
    name: "",
    date,
    time: {
      start: { hour: time, minute: 0 },
      end: { hour: time + createRange.value, minute: 0 },
    },
    code: "",
  });

  Object.assign(dialogVisible, { create: true });
};

const onClickReservation = (reservation: Reservation, date: string) => {
  const [startHour, startMinute] = reservation.time.start.split(":");
  const [endHour, endMinute] = reservation.time.end.split(":");
  Object.assign(editForm, {
    id: reservation.id,
    name: reservation.name,
    date: date,
    time: {
      start: { hour: Number(startHour), minute: Number(startMinute) },
      end: { hour: Number(endHour), minute: Number(endMinute) },
    },
    code: "",
  });

  const startNum = Number(`${startHour}${startMinute === "30" ? "50" : "00"}`);
  const endNum = Number(`${endHour}${endMinute === "30" ? "50" : "00"}`);

  editRange.value = (endNum - startNum) / 100;

  Object.assign(dialogVisible, { edit: true });
};

const weekendColorStyle = (date: string) => {
  if (formatDate(date, "d") === "0") return { color: "red" };
  if (formatDate(date, "d") === "6") return { color: "blue" };
  return {};
};

const generateReservationStyle = (reservation: Reservation, index: number) => {
  const start = reservation.time.start;
  const end = reservation.time.end;
  const startHour =
    Number(start.split(":")[0]) + Number(start.split(":")[1]) / 60;
  const endHour = Number(end.split(":")[0]) + Number(end.split(":")[1]) / 60;
  const top = (startHour - 8) * 48 + 1;
  const height = (endHour - startHour) * 48 - 1;
  const left = index * (100 / 7);

  return {
    top: `${top}px`,
    left: `${left}%`,
    height: `${height}px`,
  };
};
</script>

<style lang="scss" scoped>
.timeline {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__table-header {
    display: flex;
    gap: 8px;
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

.table-header {
  &__left {
    font-weight: bold;
    width: 36px;
    &__month {
      font-size: 26px;
      text-align: right;
    }
  }
  &__center {
    font-weight: bold;
    width: calc(100% - 72px);
    display: flex;
    &__date {
      width: calc(100% / 7);
      text-align: center;
      &__week {
        font-size: 10px;
      }
    }
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
      width: calc(100% / 7);
      height: 100%;
      padding: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      &__inner {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: #1a237e;
        border-radius: 4px;
        padding: 1px 4px;
      }
      &__name {
        font-size: 10px;
        font-weight: bold;
        overflow: hidden;
        word-break: break-all;
        color: white;
      }
      &__time {
        font-size: 10px;
        font-weight: bold;
        color: white;
        align-self: end;
      }
    }
  }
}
</style>
