<script setup lang="ts">
definePageMeta({
  name: 'reader-bookReturn',
  layout: 'reader'
});

const quasar = useQuasar();

const { data, refresh, pending } = await useFetch('/api/booking', {
  lazy: false
});

async function handleReturn(recordId: string) {
  try {
    const _res = await $fetch(`/api/booking/${recordId}`, { method: 'DELETE' });
    quasar.notify({
      message: '归还成功',
      type: 'positive'
    });
    useReaderBookReturnRefreshEvent().emit();
  }
  catch (_e) {
    quasar.notify({
      message: '归还失败',
      type: 'positive'
    });
  }
}

useReaderBookReturnRefreshEvent().on(() => refresh());
</script>

<template>
  <div>
    <QPage padding>
      <div class="flex px-2 py-2">
        <div class="flex-grow"></div>
        <QBtn
          class="ml-sm"
          color="secondary"
          round
          icon="mdi-refresh"
          @click="refresh()"
        ></QBtn>
      </div>
      <QMarkupTable class="mt-sm" separator="cell">
        <thead>
          <tr>
            <th>图书名称</th>
            <th>图书 ISBN</th>
            <th>借阅时间</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="record in data" :key="record.id">
            <tr>
              <td>{{ record.name }}</td>
              <td>{{ record.isbn }}</td>
              <td>{{ new Date(record.bookingDate).toLocaleString() }}</td>
              <td class="w-30">
                <QBtn
                  flat
                  color="primary"
                  label="归还"
                  @click="handleReturn(record.recordId)"
                ></QBtn>
              </td>
            </tr>
          </template>
        </tbody>

        <QInnerLoading :showing="pending">
          <QSpinnerGears size="50px" color="primary" />
        </QInnerLoading>
      </QMarkupTable>
    </QPage>
  </div>
</template>

<style lang="scss"></style>
