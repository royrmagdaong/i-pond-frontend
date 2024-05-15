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
              {{ phLevel }} °C
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
        <!-- <q-card
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
        </q-card> -->

        <q-card
          bordered
          flat
          style="width: 100%"
          class="flex justify-between q-pa-sm items-center"
        >
          <div>
            <q-btn
              @click="fetchPHdata"
              color="primary"
              icon="download"
              label="data"
            />
          </div>
          <div class="flex justify-end">
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
          <template v-slot:body-cell-rtd="props">
            <q-td :props="props" class="">
              {{ props.row?.attributes.rtd }} °C
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

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class=""
              >You are about to download ph level data from date to date.</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="danger" v-close-popup />
            <q-btn
              @click="downloadReportInPDF"
              flat
              label="Continue"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fullpageLoaderState } from "src/composables/globalRefs";

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
const date__from = ref("");
const date__to = ref("");
const confirm = ref(false);
const columns = [
  {
    name: "rtd",
    align: "left",
    label: "Temperature",
    field: "rtd",
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
      label: "Temperature",
      backgroundColor: "#484848",
      data: data_1,
    },
  ],
});

const pHoptions = {
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

const updateCharts = () => {
  data.value = {
    labels: phChartDataLabel.value,
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "#484848",
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
  await fetchCurrentSensorData().then((res) => {
    phLevel.value = res?.data.data[0]?.attributes.rtd;
    last_reading_date.value = res?.data.data[0]?.attributes.createdAt;
  });
  // await fetchSensorData()
  //   .then((res) => {
  //     for (let i = 0; i <= res.data.data.length; i++) {
  //       phChartData.value[i] = res?.data.data[i]?.attributes.rtd;
  //       phChartDataLabel.value[i] = moment(
  //         res?.data.data[i]?.attributes.createdAt
  //       ).format("h:mm:ss a");
  //     }

  //     phChartData.value.reverse();
  //     phChartDataLabel.value.reverse();

  //     updateCharts();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const getPH_Levels = async (dateFrom, dateTo, order) => {
  loading.value = true;

  const startRow =
    (currentPage.value - 1) * initialPagination.value.rowsPerPage;

  console.log("Page number", currentPage.value);
  await getPHLevels(
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
      console.log("Rows Meta", res?.data.meta.pagination);
      rows.value.splice(0, rows.value.length, ...rowsData);

      // update charts

      for (let i = 0; i <= res?.data.data.length; i++) {
        phChartData.value[i] = res?.data.data[i]?.attributes.rtd;
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

  date__from.value = displayDateOnly2(DATE_FROM);
  date__to.value = displayDateOnly2(DATE_TO);

  getPH_Levels(
    displayDateOnly2(DATE_FROM),
    displayDateOnly2(DATE_TO),
    sort.value
  );
};

// Download PDF
const downloadReportInPDF = async () => {
  fullpageLoaderState.value = !fullpageLoaderState.value;
  await getPHLevels(date__from.value, date__to.value, 50000, 0, sort.value)
    .then((res) => {
      console.log("Reports Data", res.data.data);
      fullpageLoaderState.value = !fullpageLoaderState.value;
      const doc = new jsPDF();
      const body = [];
      res.data.data?.forEach((i) => {
        body.push([
          `${i.attributes.rtd} °C`,
          displayTimeOnly(i.attributes.createdAt),
          displayDateOnly(i.attributes.createdAt),
        ]);
      });

      doc.text("Pond 1", 14, 10);
      autoTable(doc, {
        head: [["Temperature", "Time", "Date"]],
        body: body,
      });

      doc.save("pond-1(Temperature).pdf");
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch ph data
const fetchPHdata = () => {
  confirm.value = true;
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
