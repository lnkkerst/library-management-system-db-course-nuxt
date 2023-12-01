<script setup lang="ts">
import { PolarArea } from 'vue-chartjs';

const data = ref<any>({
  title: '1',
  labels: [],
  datasets: [
    {
      label: '图书种类'
    }
  ]
});
const loading = ref(true);

onMounted(async () => {
  const bookTypes = await $fetch('/api/admin/book-types');
  const chartOpacity = 'aa';

  const ndata: any = {
    labels: [],
    datasets: [
      {
        label: '图书数量',
        backgroundColor: [
          `#EE7091${chartOpacity}`,
          `#F7D5A1${chartOpacity}`,
          `#FFF5E4${chartOpacity}`,
          `#B6E0C7${chartOpacity}`,
          `#7E8CD2${chartOpacity}`,
          `#86557A${chartOpacity}`,
          `#79D0E8${chartOpacity}`
        ],
        data: []
      }
    ]
  };

  for (const x of bookTypes) {
    const totalCount = (
      await $fetch('/api/admin/books', {
        query: {
          bookTypeId: x.id
        }
      })
    ).totalCount;
    ndata.datasets[0].data.push(totalCount);
    ndata.labels.push(x.name);
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
          <div class="text-h6 text-center">图书种类</div>
        </QCardSection>
        <QCardSection class="grid place-items-center">
          <PolarArea :data="data"></PolarArea>
        </QCardSection>
      </QCard>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
