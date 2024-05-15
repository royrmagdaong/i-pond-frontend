<template>
  <q-page class="flex flex-center">
    <q-card flat class="q-pa-sm">
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
              class="q-pa-md text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <!-- Line chart -->
              <!-- <p class="text-h3 text-center q-mb-sm" style="color: #484848">
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
              </div> -->

              <!-- gauge -->
              <p class="text-center text-body1">pH Level</p>
              <div class="text-center q-mt-sm">
                <canvas
                  data-type="radial-gauge"
                  data-width="250"
                  data-height="250"
                  data-units="pH"
                  data-title="false"
                  :data-value="phLevel"
                  data-animate-on-init="true"
                  data-animated-value="true"
                  data-min-value="0"
                  data-max-value="12"
                  data-major-ticks="0,1,2,3,4,5,6,7,8,9,10,11,12"
                  data-minor-ticks="2"
                  data-stroke-ticks="false"
                  data-highlights='[
                    { "from": 0, "to": 2, "color": "#C50039" },
                    { "from": 2, "to": 3, "color": "#EE4800" },
                    { "from": 3, "to": 4, "color": "#FB8000" },
                    { "from": 4, "to": 5, "color": "#FEB000" },
                    { "from": 5, "to": 6, "color": "#FED503" },
                    { "from": 6, "to": 7, "color": "#CAD703" },
                    { "from": 7, "to": 8, "color": "#A7D400" },
                    { "from": 8, "to": 9, "color": "#05A119" },
                    { "from": 9, "to": 10, "color": "#015052" },
                    { "from": 10, "to": 11, "color": "#3601A9" },
                    { "from": 11, "to": 12, "color": "#5401A7" }
                  ]'
                  data-color-plate="transparent"
                  data-color-major-ticks="#f5f5f5"
                  data-color-minor-ticks="#ddd"
                  data-color-title="#fff"
                  data-color-units="#222"
                  data-color-numbers="#888"
                  data-color-needle-start="rgba(240, 128, 128)"
                  data-color-needle-end="rgba(255, 160, 122)"
                  data-value-box="true"
                  data-animation-rule="bounce"
                  data-animation-duration="1000"
                  data-border-outer-width="3"
                  data-border-middle-width="3"
                  data-border-inner-width="3"
                ></canvas>
                <p
                  style="color: #7a7a7a; margin: 0"
                  class="text-caption text-center"
                >
                  as of
                  {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
                </p>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <div class="sal-hover-border" @click="select('sal')"></div>
            <q-card-section
              class="q-pa-md text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <!-- Line chart -->
              <!-- <p class="text-h3 text-center q-mb-sm" style="color: #484848">
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
              </div> -->

              <!-- gauge -->
              <p class="text-center text-body1">Salinity</p>
              <div class="text-center q-mt-sm">
                <canvas
                  data-type="radial-gauge"
                  data-width="250"
                  data-height="250"
                  data-units="ppt"
                  data-title="false"
                  :data-value="salinity"
                  data-animate-on-init="true"
                  data-animated-value="true"
                  data-min-value="0"
                  data-max-value="50"
                  data-major-ticks="0,5,10,15,20,25,30,35,40,45,50"
                  data-minor-ticks="2"
                  data-stroke-ticks="false"
                  data-highlights='[
                    { "from": 0, "to": 5, "color": "#265C7E" },
                    { "from": 5, "to": 15, "color": "#45767A" },
                    { "from": 15, "to": 20, "color": "#5E7F52" },
                    { "from": 20, "to": 30, "color": "#7F8C3C" },
                    { "from": 30, "to": 40, "color": "#ADAF4E" },
                    { "from": 40, "to": 45, "color": "#DAC73C" },
                    { "from": 45, "to": 50, "color": "#F5D84C" }
                  ]'
                  data-color-plate="transparent"
                  data-color-major-ticks="#f5f5f5"
                  data-color-minor-ticks="#ddd"
                  data-color-title="#fff"
                  data-color-units="#222"
                  data-color-numbers="#888"
                  data-color-needle-start="rgba(240, 128, 128)"
                  data-color-needle-end="rgba(255, 160, 122)"
                  data-value-box="true"
                  data-animation-rule="bounce"
                  data-animation-duration="1000"
                  data-border-outer-width="3"
                  data-border-middle-width="3"
                  data-border-inner-width="3"
                ></canvas>
              </div>
              <p
                style="color: #7a7a7a; margin: 0"
                class="text-caption text-center"
              >
                as of
                {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
              </p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <div class="temp-hover-border" @click="select('temp')"></div>
            <q-card-section
              class="q-pa-md text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <!-- Line chart -->
              <!-- <p class="text-h3 text-center q-mb-sm" style="color: #484848">
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
              </div> -->

              <!-- gauge -->
              <p class="text-center text-body1">Temperature</p>
              <div class="text-center q-mt-sm">
                <canvas
                  data-type="radial-gauge"
                  data-width="250"
                  data-height="250"
                  data-units="°C"
                  data-title="true"
                  :data-value="temperature"
                  data-animate-on-init="true"
                  data-animated-value="true"
                  data-min-value="5"
                  data-max-value="50"
                  data-major-ticks="5,10,15,20,25,30,35,40,45,50"
                  data-minor-ticks="2"
                  data-stroke-ticks="false"
                  data-highlights='[
                    { "from": 5, "to": 10, "color": "#05F7F8" },
                    { "from": 10, "to": 15, "color": "#3AB54A" },
                    { "from": 15, "to": 20, "color": "#80FF00" },
                    { "from": 20, "to": 25, "color": "#CDFF00" },
                    { "from": 25, "to": 30, "color": "#FEFF00" },
                    { "from": 30, "to": 35, "color": "#FFD728" },
                    { "from": 35, "to": 40, "color": "#FF9E07" },
                    { "from": 40, "to": 45, "color": "#F46523" },
                    { "from": 45, "to": 50, "color": "#FE0000" }
                  ]'
                  data-color-plate="transparent"
                  data-color-major-ticks="#f5f5f5"
                  data-color-minor-ticks="#ddd"
                  data-color-title="#fff"
                  data-color-units="#222"
                  data-color-numbers="#888"
                  data-color-needle-start="rgba(240, 128, 128)"
                  data-color-needle-end="rgba(255, 160, 122)"
                  data-value-box="true"
                  data-animation-rule="bounce"
                  data-animation-duration="1000"
                  data-border-outer-width="3"
                  data-border-middle-width="3"
                  data-border-inner-width="3"
                ></canvas>
              </div>
              <p
                style="color: #7a7a7a; margin: 0"
                class="text-caption text-center"
              >
                as of
                {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
              </p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <div class="dox-hover-border" @click="select('dox')"></div>
            <q-card-section
              class="q-pa-md text-overline"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <!-- Line chart -->
              <!-- <p class="text-h3 text-center q-mb-sm" style="color: #484848">
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
              </div> -->

              <!-- gauge -->
              <p class="text-center text-body1">Dissolved Oxygen</p>
              <div class="text-center q-mt-sm">
                <canvas
                  data-type="radial-gauge"
                  data-width="250"
                  data-height="250"
                  data-units="mg/L"
                  data-title="false"
                  :data-value="dissolvedOxygen"
                  data-animate-on-init="true"
                  data-animated-value="true"
                  data-min-value="0"
                  data-max-value="15"
                  data-major-ticks="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
                  data-minor-ticks="2"
                  data-stroke-ticks="false"
                  data-highlights='[
                    { "from": 0, "to": 1, "color": "#C01D2E" },
                    { "from": 1, "to": 2, "color": "#ED1B24" },
                    { "from": 2, "to": 3, "color": "#F15941" },
                    { "from": 3, "to": 4, "color": "#F68567" },
                    { "from": 4, "to": 5, "color": "#FABEA6" },
                    { "from": 5, "to": 6, "color": "#6DCFF6" },
                    { "from": 6, "to": 8, "color": "#01BAF3" },
                    { "from": 8, "to": 10, "color": "#24A9E2" },
                    { "from": 10, "to": 12, "color": "#0F75BD" },
                    { "from": 12, "to": 15, "color": "#28388F" }
                  ]'
                  data-color-plate="transparent"
                  data-color-major-ticks="#f5f5f5"
                  data-color-minor-ticks="#ddd"
                  data-color-title="#fff"
                  data-color-units="#888"
                  data-color-numbers="#888"
                  data-color-needle-start="rgba(240, 128, 128)"
                  data-color-needle-end="rgba(255, 160, 122)"
                  data-value-box="true"
                  data-animation-rule="bounce"
                  data-animation-duration="1000"
                  data-border-outer-width="3"
                  data-border-middle-width="3"
                  data-border-inner-width="3"
                ></canvas>
              </div>
              <p
                style="color: #7a7a7a; margin: 0"
                class="text-caption text-center"
              >
                as of
                {{ moment(last_reading_date).format("MMMM DD, YYYY hh:mmA") }}
              </p>
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
// import server_url from "src/constants/server-url";
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
// import { RadialGauge, LinearGauge } from "canvas-gauges";
import SERVER from "src/constants/server-url";

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

const socket_IO = socket(SERVER.socketURL, {});

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

const ph_gauge = ref(7);
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

  const plugin = document.createElement("script");
  plugin.setAttribute(
    "src",
    "//cdn.rawgit.com/Mikhus/canvas-gauges/gh-pages/download/2.1.7/all/gauge.min.js"
  );
  plugin.async = true;
  document.head.appendChild(plugin);
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
