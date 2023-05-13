import { ref, InjectionKey, reactive } from "vue";
import axios from "axios";
import {
  Day,
  RangeType,
  ClickedRow,
  DialogVisible,
  ReservationCreateForm,
} from "@/types";

export const key: InjectionKey<ReturnType<typeof useProvide>> = Symbol("List");

export const useProvide = () => {
  const day = ref<Day>({
    date: "",
    reservations: [],
  });

  const days = ref<Day[]>([]);

  const dialogVisible = reactive<DialogVisible>({
    create: false,
    edit: false,
  });

  const clickedRow = reactive<ClickedRow>({
    date: "",
    time: 0,
  });

  const createForm = reactive<ReservationCreateForm>({
    name: "",
    date: "",
    time: {
      start: { hour: 0, minute: 0 },
      end: { hour: 0, minute: 0 },
    },
    passcode: "",
  });

  const shiftTime = (diffMinute: 30 | -30) => {
    const start = createForm.time.start;
    const end = createForm.time.end;
    if (
      (end.hour >= 22 && end.minute === 0 && diffMinute === 30) ||
      (start.hour <= 8 && start.minute === 0 && diffMinute === -30)
    ) {
      return;
    }

    const startHour =
      diffMinute === 30 && start.minute === 30
        ? start.hour + 1
        : diffMinute === -30 && start.minute === 0
        ? start.hour - 1
        : start.hour;

    const endHour =
      diffMinute === 30 && end.minute === 30
        ? end.hour + 1
        : diffMinute === -30 && end.minute === 0
        ? end.hour - 1
        : end.hour;

    const startMinute = start.minute === 30 ? 0 : 30;
    const endMinute = end.minute === 30 ? 0 : 30;

    Object.assign(createForm.time, {
      start: { hour: startHour, minute: startMinute },
      end: { hour: endHour, minute: endMinute },
    });
  };

  const fetchReservations = async (type: RangeType, page: number) => {
    const { data } = await axios.get<Day[]>("/reserve", {
      params: {
        t: type,
        p: page,
      },
    });
    days.value = data;
    day.value = data[0];
  };

  return {
    days,
    day,
    dialogVisible,
    clickedRow,
    createForm,
    shiftTime,
    fetchReservations,
  };
};
