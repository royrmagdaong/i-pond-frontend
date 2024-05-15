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
        <q-card
          bordered
          flat
          style="width: 100%"
          class="flex justify-end q-pa-sm"
        >
          <div class="q-mr-sm sort-opt">
            <q-select
              dense
              outlined
              v-model="sort"
              :options="sort_options"
              @update:model-value="changeQueryParams"
            />
          </div>
          <div class="q-mr-sm date-from">
            <q-input
              dense
              outlined
              v-model="date_from"
              label="Date from"
              mask="date"
              :rules="['date']"
              hide-bottom-space
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="date_from"
                      @update:model-value="changeQueryParams"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="date-to">
            <q-input
              dense
              outlined
              v-model="date_to"
              label="Date to"
              mask="date"
              :rules="['date']"
              hide-bottom-space
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="date_to"
                      @update:model-value="changeQueryParams"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
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
          :loading="loading"
        >
          <!--  -->
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
          <template v-slot:bottom>
            <div
              class="flex items-center justify-between"
              style="width: 100% !important"
            >
              <div>
                <span class="q-mr-md text-caption">
                  {{ (currentPage - 1) * initialPagination.rowsPerPage + 1 }}
                  -
                  {{
                    currentPage * initialPagination.rowsPerPage < totalRows
                      ? currentPage * initialPagination.rowsPerPage
                      : totalRows
                  }}
                  out of
                  {{
                    maxPage * initialPagination.rowsPerPage > totalRows
                      ? totalRows
                      : maxPage * initialPagination.rowsPerPage
                  }}
                </span>
              </div>
              <q-pagination
                v-model="currentPage"
                :max="maxPage"
                input
                @update:model-value="dateOnChange"
              />
            </div>
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
  fetchSensorData_pnd3,
  fetchCurrentSensorData_pnd3,
  getPHLevels_pnd3,
} from "src/api/sensor_data";
import socket from "socket.io-client";
import SERVER from "src/constants/server-url";
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
  displayDateOnly2,
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

const socket_IO = socket(SERVER.socketURL, {});

const phLevel = ref(0);
const phChartData = ref([]);
const phChartDataLabel = ref([]);
const last_reading_date = ref("");
const rows = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const maxPage = ref(1);
const totalRows = ref(0);
const date_from = ref(
  displayDateOnly2(new Date().setDate(new Date().getDate()))
);
const date_to = ref(displayDateOnly2(new Date().setDate(new Date().getDate())));
const sort = ref("desc");
const sort_options = ref(["asc", "desc"]);
const columns = [
  {
    name: "ph",
    align: "left",
    label: "Humidity",
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
  rowsPerPage: 20,
  rowsNumber: 20,
});

let data_1 = [];

const data = ref({
  // labels: label1,
  datasets: [
    {
      label: "Humidity",
      backgroundColor: "#71c1ef",
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
      max: 100,
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
        label: "Humidity",
        backgroundColor: "#71c1ef",
        data: phChartData.value,
      },
    ],
  };
};

const initSocketIO = async () => {
  socket_IO.on(`ipond-dashboard`, async (data) => {
    // console.log(data);
    await getSensorData();
  });
};

const getSensorData = async () => {
  await fetchCurrentSensorData_pnd3().then((res) => {
    phLevel.value = res?.data.data[0]?.attributes.ph;
    // salinity.value = res?.data.data[0]?.attributes.sal;
    // temperature.value = res?.data.data[0]?.attributes.rtd;
    // dissolvedOxygen.value = res?.data.data[0]?.attributes.dox;
    last_reading_date.value = res?.data.data[0]?.attributes.createdAt;
  });
};

const getPH_Levels = async (dateFrom, dateTo, order) => {
  loading.value = true;

  const startRow =
    (currentPage.value - 1) * initialPagination.value.rowsPerPage;

  console.log("Page number", currentPage.value);
  await getPHLevels_pnd3(
    dateFrom,
    dateTo,
    initialPagination.value.rowsPerPage,
    startRow,
    order
  )
    .then((res) => {
      maxPage.value = Math.ceil(
        res?.data.meta.pagination.total / res?.data.meta.pagination.limit
      );
      totalRows.value = res?.data.meta.pagination.total;

      const rowsData = res?.data.data;
      // console.log("Rows Meta", res?.data);
      rows.value.splice(0, rows.value.length, ...rowsData);

      // update charts
      for (let i = 0; i <= res?.data.data.length; i++) {
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
    })
    .finally(() => {
      loading.value = false;
    });
};

const dateOnChange = () => {
  const dateFrom = `${date_from.value.substring(
    0,
    4
  )}-${date_from.value.substring(5, 7)}-${date_from.value.substring(8, 10)}`;
  const dateTo = `${date_to.value.substring(0, 4)}-${date_to.value.substring(
    5,
    7
  )}-${date_to.value.substring(8, 10)}`;

  var DATE_FROM = new Date(dateFrom);
  DATE_FROM.setDate(DATE_FROM.getDate());
  var DATE_TO = new Date(dateTo);
  DATE_TO.setDate(DATE_TO.getDate() + 1);

  getPH_Levels(
    displayDateOnly2(DATE_FROM),
    displayDateOnly2(DATE_TO),
    sort.value
  );
};

const changeQueryParams = () => {
  currentPage.value = 1;
  dateOnChange();
};
onMounted(async () => {
  getSensorData();
  dateOnChange();
  initSocketIO();
});
</script>
<style scoped>
.date-from,
.date-to {
  max-width: 150px;
}
@media only screen and (max-width: 420px) {
  .date-from,
  .date-to {
    max-width: 128px;
  }
}

@media only screen and (max-width: 376px) {
  .date-from,
  .date-to {
    max-width: 125px;
  }
  .sort-opt {
    max-width: 70px;
  }
}
</style>
