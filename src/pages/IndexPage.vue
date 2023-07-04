<template>
  <q-page class="flex flex-center">
    <q-card bordered flat class="q-pa-sm">
      <p class="text-h5 q-pt-sm q-pl-sm text-weight-bold">Pond 1</p>
      <div class="row q-col-gutter-sm q-pa-sm">
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <q-card-section
              class="q-pa-sm text-overline row flex"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <div class="col-3">
                <p class="q-pl-sm">Ph Level</p>
                <p class="text-h3">{{ phLevel }}</p>
              </div>
              <div class="col-9" style="height: 200px">
                <Bar :data="data" :options="options" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <q-card-section
              class="q-pa-sm text-overline row flex"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <div class="col-3">
                <p class="q-pl-sm">Salinity</p>
                <p class="text-h3">{{ salinity }}</p>
              </div>
              <div class="col-9" style="height: 200px">
                <Bar :data="data2" :options="options" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <q-card-section
              class="q-pa-sm text-overline row flex"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <div class="col-3">
                <p class="q-pl-sm">Temperature</p>
                <p class="text-h3">{{ temperature }}</p>
              </div>
              <div class="col-9" style="height: 200px">
                <Bar :data="data3" :options="options" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card bordered flat style="height: 100%">
            <q-card-section
              class="q-pa-sm text-overline row flex"
              style="letter-spacing: 1px; font-size: 14px"
            >
              <div class="col-3">
                <p class="q-pl-sm">Dissolved Oxygen</p>
                <p class="text-h3">{{ dissolvedOxygen }}</p>
              </div>
              <div class="col-9" style="height: 200px">
                <Bar :data="data4" :options="options" />
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
import { fetchSensorData } from "src/api/sensor_data";
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

const socket_IO = socket(server_url, {});
const phLevel = ref(0);
const salinity = ref(0);
const temperature = ref(0);
const dissolvedOxygen = ref(0);
const phChartData = ref([]);
const phChartDataLabel = ref([]);
const salChartData = ref([]);
const salChartDataLabel = ref([]);
const rtdChartData = ref([]);
const rtdChartDataLabel = ref([]);
const doxChartData = ref([]);
const doxChartDataLabel = ref([]);

const data = ref({
  labels: ["1", "2", "3", "4", "5", "6", "7", "6", "7", "6", "7"],
  datasets: [
    {
      label: "pH",
      backgroundColor: "#55a3d4",
      data: [40, 38, 32, 39, 52, 45, 39],
    },
  ],
});

const data2 = ref({
  labels: ["1", "2", "3", "4", "5", "6", "7", "6", "7", "6", "7"],
  datasets: [
    {
      label: "pH",
      backgroundColor: "#55a3d4",
      data: [40, 38, 32, 39, 52, 45, 39],
    },
  ],
});

const data3 = ref({
  labels: ["1", "2", "3", "4", "5", "6", "7", "6", "7", "6", "7"],
  datasets: [
    {
      label: "pH",
      backgroundColor: "#55a3d4",
      data: [40, 38, 32, 39, 52, 45, 39],
    },
  ],
});

const data4 = ref({
  labels: ["1", "2", "3", "4", "5", "6", "7", "6", "7", "6", "7"],
  datasets: [
    {
      label: "pH",
      backgroundColor: "#55a3d4",
      data: [40, 38, 32, 39, 52, 45, 39],
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
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
        backgroundColor: "#55a3d4",
        data: phChartData.value,
      },
    ],
  };

  data2.value = {
    labels: salChartDataLabel.value,
    datasets: [
      {
        label: "pH",
        backgroundColor: "#55a3d4",
        data: salChartData.value,
      },
    ],
  };

  data3.value = {
    labels: rtdChartDataLabel.value,
    datasets: [
      {
        label: "pH",
        backgroundColor: "#55a3d4",
        data: rtdChartData.value,
      },
    ],
  };

  data4.value = {
    labels: doxChartDataLabel.value,
    datasets: [
      {
        label: "pH",
        backgroundColor: "#55a3d4",
        data: doxChartData.value,
      },
    ],
  };
};

const get_10_sensor_data = async () => {
  await fetchSensorData()
    .then((res) => {
      phLevel.value = res?.data.data[0].attributes.ph;
      salinity.value = res?.data.data[0].attributes.sal;
      temperature.value = res?.data.data[0].attributes.rtd;
      dissolvedOxygen.value = res?.data.data[0].attributes.dox;

      for (let i = 0; i <= 9; i++) {
        phChartData.value[i] = res?.data.data[i].attributes.ph;
        phChartDataLabel.value[i] = moment(
          res?.data.data[i].attributes.createdAt
        ).format("h:mm:ss a");

        salChartData.value[i] = res?.data.data[i].attributes.sal;
        salChartDataLabel.value[i] = moment(
          res?.data.data[i].attributes.createdAt
        ).format("h:mm:ss a");

        rtdChartData.value[i] = res?.data.data[i].attributes.rtd;
        rtdChartDataLabel.value[i] = moment(
          res?.data.data[i].attributes.createdAt
        ).format("h:mm:ss a");

        doxChartData.value[i] = res?.data.data[i].attributes.dox;
        doxChartDataLabel.value[i] = moment(
          res?.data.data[i].attributes.createdAt
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

onMounted(async () => {
  await initSocketIO();
  await get_10_sensor_data();
});
</script>
