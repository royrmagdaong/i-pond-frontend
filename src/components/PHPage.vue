<template>
  <q-page class="">
    <BackButton class="q-mt-lg q-ml-md" />
    <div class="row q-col-gutter-sm q-pa-sm">
      <div class="col-12">
        <q-card bordered flat style="height: 100%; width: 100%" class="">
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
            <div style="height: 220px">
              <Bar :data="data" :options="pHoptions" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          flat
          bordered
          :pagination="initialPagination"
        >
          <template v-slot:body-cell-ph="props">
            <q-td :props="props" class="">
              {{ props.row?.attributes.ph }}
            </q-td>
          </template>
          <template v-slot:body-cell-time="props">
            <q-td :props="props" class="">
              {{ displayTimeOnly(props.row?.attributes.createdAt) }}
            </q-td>
          </template>
          <template v-slot:body-cell-createdAt="props">
            <q-td :props="props" class="">
              {{ displayDateOnly(props.row?.attributes.createdAt) }}
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BackButton from "src/components/BackButton.vue";
import {
  fetchSensorData,
  fetchCurrentSensorData,
  getPHLevels,
} from "src/api/sensor_data";
import socket from "socket.io-client";
import server_url from "src/constants/server-url";
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
import { Bar } from "vue-chartjs";
import moment from "moment";
import {
  displayTimeOnly,
  displayDateOnly,
} from "src/composables/useDateFormatter";

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

const socket_IO = socket("https://i-pond-backend.ap.ngrok.io", {});
// const socket_IO = socket(server_url, {});
const phLevel = ref(0);
const phChartData = ref([]);
const phChartDataLabel = ref([]);
const last_reading_date = ref("");
const rows = ref([]);
const columns = [
  {
    name: "ph",
    align: "left",
    label: "PH Level",
    field: "ph",
  },
  {
    name: "time",
    align: "left",
    label: "Time",
    field: "time",
  },
  {
    name: "createdAt",
    align: "left",
    label: "Date",
    field: "createdAt",
  },
];

const initialPagination = ref({
  // sortBy: "asc",
  // descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: xx if getting data from a server
});

let data_1 = [];

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
};

const initSocketIO = async () => {
  socket_IO.on(`ipond-dashboard`, async (data) => {
    console.log(data);
    await getSensorData();
  });
};

const getSensorData = async () => {
  await fetchCurrentSensorData().then((res) => {
    console.log(res);
    phLevel.value = res?.data.data[0]?.attributes.ph;
    // salinity.value = res?.data.data[0]?.attributes.sal;
    // temperature.value = res?.data.data[0]?.attributes.rtd;
    // dissolvedOxygen.value = res?.data.data[0]?.attributes.dox;
    last_reading_date.value = res?.data.data[0]?.attributes.createdAt;
  });
  await fetchSensorData()
    .then((res) => {
      console.log(res);
      console.log(res?.data);

      for (let i = 0; i <= res.data.data.length; i++) {
        phChartData.value[i] = res?.data.data[i]?.attributes.ph;
        phChartDataLabel.value[i] = moment(
          res?.data.data[i]?.attributes.createdAt
        ).format("h:mm:ss a");
      }

      phChartData.value.reverse();
      phChartDataLabel.value.reverse();

      updateCharts();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPH_Levels = async () => {
  await getPHLevels()
    .then((res) => {
      console.log("PH", res);
      rows.value = res?.data.data;
      console.log("Rows", rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getSensorData();
  getPH_Levels();
  initSocketIO();
});
</script>
<style scoped></style>
