<template>
  <q-page class="flex flex-center">
    <q-card bordered flat class="q-pa-sm">
      <!-- <p
        class="text-h3 q-pt-sm q-pl-sm text-weight-bold text-center"
        style="color: #484848"
      >
        Pond 1
      </p> -->
      <div class="row q-col-gutter-sm q-pa-sm">
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%" class="">
            <div class="ph-hover-border" @click="select('ph')"></div>
            <q-card-section
              class="q-pa-lg text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <p class="text-h3 text-center q-mb-sm" style="color: #484848">
                {{ phLevel }}
              </p>
              <p
                style="color: #7a7a7a; margin: 0"
                class="text-caption text-center"
              >
                as of
                {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
              </p>
              <div style="height: 220px; position: relative; z-index: 11">
                <Bar :data="data" :options="pHoptions" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <div class="sal-hover-border" @click="select('sal')"></div>
            <q-card-section
              class="q-pa-lg text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <p class="text-h3 text-center q-mb-sm" style="color: #484848">
                {{ salinity }} ppt
              </p>
              <p
                style="color: #7a7a7a; margin: 0"
                class="text-caption text-center"
              >
                as of
                {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
              </p>
              <div style="height: 220px; position: relative; z-index: 11">
                <Bar :data="data2" :options="salinityOptions" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <div class="temp-hover-border" @click="select('temp')"></div>
            <q-card-section
              class="q-pa-lg text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <p class="text-h3 text-center q-mb-sm" style="color: #484848">
                {{ temperature }} °C
              </p>
              <p
                style="color: #7a7a7a; margin: 0"
                class="text-caption text-center"
              >
                as of
                {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
              </p>
              <div style="height: 220px; position: relative; z-index: 11">
                <Bar :data="data3" :options="tempOptions" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <div class="dox-hover-border" @click="select('dox')"></div>
            <q-card-section
              class="q-pa-lg text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <p class="text-h3 text-center q-mb-sm" style="color: #484848">
                {{ dissolvedOxygen }} mg/L
              </p>
              <p
                style="color: #7a7a7a; margin: 0"
                class="text-caption text-center"
              >
                as of
                {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
              </p>
              <div style="height: 220px; position: relative; z-index: 11">
                <Bar :data="data4" :options="doxOptions" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import socket from "socket.io-client";
import server_url from "src/constants/server-url";
import { fetchSensorData, fetchCurrentSensorData } from "src/api/sensor_data";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "vue-chartjs";
import moment from "moment";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";
import keys from "../constants/localStorageKeys";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const socket_IO = socket("http://localhost:1338", {});
const socket_IO = socket("https://i-pond-backend.ap.ngrok.io", {});
// const socket_IO = socket(server_url, {});
const phLevel = ref(0);
const salinity = ref(0);
const temperature = ref(0);
const dissolvedOxygen = ref(0);
const last_reading_date = ref("");
const phChartData = ref([]);
const phChartDataLabel = ref([]);
const salChartData = ref([]);
const salChartDataLabel = ref([]);
const rtdChartData = ref([]);
const rtdChartDataLabel = ref([]);
const doxChartData = ref([]);
const doxChartDataLabel = ref([]);

let label1 = [];
let data_1 = [];
// for (let i = 0; i <= 149; i++) {
//   label1.push(Math.floor(Math.random() * 100));
//   data_1.push(Math.floor(Math.random() * 100));
// }

const router = useRouter();

const data = ref({
  // labels: label1,
  datasets: [
    {
      label: "pH",
      backgroundColor: "#d84527",
      data: data_1,
    },
  ],
});

const data2 = ref({
  // labels: ["1", "2", "3", "4", "5", "6", "7", "6", "7", "6", "7"],
  datasets: [
    {
      label: "salinity",
      backgroundColor: "#54ab66",
      data: [40, 38, 32, 39, 52, 45, 39],
    },
  ],
});

const data3 = ref({
  // labels: ["1", "2", "3", "4", "5", "6", "7", "6", "7", "6", "7"],
  datasets: [
    {
      label: "temperature",
      backgroundColor: "#484848",
      data: [40, 38, 32, 39, 52, 45, 39],
    },
  ],
});

const data4 = ref({
  // labels: ["1", "2", "3", "4", "5", "6", "7", "6", "7", "6", "7"],
  datasets: [
    {
      label: "dissolved oxygen",
      backgroundColor: "#ece513",
      data: [40, 38, 32, 39, 52, 45, 39],
    },
  ],
});

const pHoptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 12,
    },
    x: {
      ticks: {
        display: false, // Hide x-axis label text
      },
    },
  },
};

const salinityOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 50,
    },
    x: {
      ticks: {
        display: false, // Hide x-axis label text
      },
    },
  },
};

const tempOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 10,
      max: 50,
    },
    x: {
      ticks: {
        display: false, // Hide x-axis label text
      },
    },
  },
};

const doxOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 15,
    },
    x: {
      ticks: {
        display: false, // Hide x-axis label text
      },
    },
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Custom Chart Title",
      },
    },
  },
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const updateCharts = () => {
  data.value = {
    labels: phChartDataLabel.value,
    datasets: [
      {
        label: "pH",
        backgroundColor: "#d84527",
        data: phChartData.value,
      },
    ],
  };

  data2.value = {
    labels: salChartDataLabel.value,
    datasets: [
      {
        label: "Salinity",
        backgroundColor: "#54ab66",
        data: salChartData.value,
      },
    ],
  };

  data3.value = {
    labels: rtdChartDataLabel.value,
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "#484848",
        font: {
          size: 32,
        },
        data: rtdChartData.value,
      },
    ],
  };

  data4.value = {
    labels: doxChartDataLabel.value,
    datasets: [
      {
        label: "Dissolved Oxygen",
        backgroundColor: "#ece513",
        data: doxChartData.value,
      },
    ],
  };
};

const get_10_sensor_data = async () => {
  await fetchCurrentSensorData().then((res) => {
    phLevel.value = res?.data.data[0]?.attributes.ph;
    salinity.value = res?.data.data[0]?.attributes.sal;
    temperature.value = res?.data.data[0]?.attributes.rtd;
    dissolvedOxygen.value = res?.data.data[0]?.attributes.dox;
    last_reading_date.value = res?.data.data[0]?.attributes.createdAt;
  });
  await fetchSensorData()
    .then((res) => {
      console.log(res?.data);

      for (let i = 0; i <= res.data.data.length; i++) {
        phChartData.value[i] = res?.data.data[i]?.attributes.ph;
        phChartDataLabel.value[i] = moment(
          res?.data.data[i]?.attributes.createdAt
        ).format("h:mm:ss a");

        salChartData.value[i] = res?.data.data[i]?.attributes.sal;
        salChartDataLabel.value[i] = moment(
          res?.data.data[i]?.attributes.createdAt
        ).format("h:mm:ss a");

        rtdChartData.value[i] = res?.data.data[i]?.attributes.rtd;
        rtdChartDataLabel.value[i] = moment(
          res?.data.data[i]?.attributes.createdAt
        ).format("h:mm:ss a");

        doxChartData.value[i] = res?.data.data[i]?.attributes.dox;
        doxChartDataLabel.value[i] = moment(
          res?.data.data[i]?.attributes.createdAt
        ).format("h:mm:ss a");
      }

      phChartData.value.reverse();
      phChartDataLabel.value.reverse();
      salChartData.value.reverse();
      salChartDataLabel.value.reverse();
      rtdChartData.value.reverse();
      rtdChartDataLabel.value.reverse();
      doxChartData.value.reverse();
      doxChartDataLabel.value.reverse();

      updateCharts();
    })
    .catch((err) => {
      console.log(err);
    });
};

const initSocketIO = async () => {
  socket_IO.on(`ipond-dashboard`, async (data) => {
    console.log(data);
    await get_10_sensor_data();
  });
};

const select = (val) => {
  const basePath = router.currentRoute.value.path;
  switch (val) {
    case "ph":
      router.push({ path: `${basePath}/ph` });
      break;
    case "sal":
      router.push({ path: `${basePath}/sal` });
      break;
    case "dox":
      router.push({ path: `${basePath}/dox` });
      break;
    case "temp":
      router.push({ path: `${basePath}/temp` });
      break;
    default:
      break;
  }
};

onMounted(async () => {
  await initSocketIO();
  await get_10_sensor_data();
});
</script>
<style scoped>
.ph-hover-border,
.sal-hover-border,
.dox-hover-border,
.temp-hover-border {
  position: absolute;
  inset: 0;
  z-index: 10;
}
.ph-hover-border:hover {
  border: 8px solid #d84527;
  cursor: pointer;
}
.sal-hover-border:hover {
  border: 8px solid #54ab66;
  cursor: pointer;
}
.dox-hover-border:hover {
  border: 8px solid #ece513;
  cursor: pointer;
}
.temp-hover-border:hover {
  border: 8px solid #484848;
  cursor: pointer;
}
</style>
