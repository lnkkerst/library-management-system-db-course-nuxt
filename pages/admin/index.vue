<script setup lang="ts">
definePageMeta({
  name: 'admin-index'
});
</script>

<template>
  <div>
    <QPage padding>
      <div class="text-h6">🎊 欢迎来到图书管理系统 - 管理员侧 🎊</div>
      <ClientOnly>
        <div class="grid grid-cols-1 sm:grid-cols-2 mt-sm gap-4">
          <ChartsBookTypes></ChartsBookTypes>
          <ChartsReaderTypes></ChartsReaderTypes>
        </div>
      </ClientOnly>
    </QPage>
  </div>
</template>

<style scoped></style>
