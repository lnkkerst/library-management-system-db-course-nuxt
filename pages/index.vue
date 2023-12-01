<script setup lang="ts">
definePageMeta({
  name: 'reader-index',
  layout: 'reader'
});
</script>

<template>
  <div>
    <QPage padding>
      <div class="text-h6">🎊 欢迎来到图书借阅平台 🎊</div>

      <ClientOnly>
        <div class="grid grid-cols-1 sm:grid-cols-2 mt-sm gap-4">
          <ChartsBookTypes></ChartsBookTypes>
          <ChartsBookingAmount></ChartsBookingAmount>
        </div>
      </ClientOnly>
    </QPage>
  </div>
</template>

<style scoped></style>
