<script setup lang="ts">
import { Line } from 'vue-chartjs';

const data = ref<any>({
  labels: [],
  datasets: [
    {
      label: '借书数量',
      data: []
    }
  ]
});
const loading = ref(true);

onMounted(async () => {
  const ndata: any = {
    labels: [],
    datasets: [
      {
        label: '借书数量',
        backgroundColor: '#9c0c13',
        data: []
      }
    ]
  };

  const res = await $fetch('/api/booking');

  const mp = new Map<string, number>();

  for (const x of res) {
    const date = new Date(x.bookingDate).toDateString();
    mp.set(date, (mp.get(date) ?? 0) + 1);
  }

  const rd = [];
  for (const x of mp.entries()) {
    rd.push(x);
  }

  rd.sort((a, b) => {
    const da = new Date(a[0]).getTime();
    const db = new Date(b[0]).getTime();
    return da - db;
  });

  for (const x of rd) {
    ndata.labels.push(new Date(x[0]).toLocaleDateString());
    ndata.datasets[0].data.push(x[1]);
  }

  data.value = ndata;

  loading.value = false;
});
</script>

<template>
  <div>
    <ClientOnly>
      <QCard>
        <QInnerLoading :showing="loading" class="z-1000">
          <QSpinnerGears size="50px" color="primary" />
        </QInnerLoading>
        <QCardSection>
          <div class="text-h6 text-center">借书数量</div>
        </QCardSection>
        <QCardSection class="grid place-items-center">
          <Line :data="data" :options="{ responsive: true }"></Line>
        </QCardSection>
      </QCard>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
