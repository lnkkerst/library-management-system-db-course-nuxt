<script setup lang="ts">
definePageMeta({
  name: 'admin-login'
});

const formType = ref<'login' | 'register'>('login');
function toggleFormType() {
  if (formType.value === 'login') {
    formType.value = 'register';
  }
  else {
    formType.value = 'login';
  }
}
</script>

<template>
  <div>
    <QPage class="h-full grid place-items-center">
      <QCard class="w-88 h-96">
        <QCardSection class="bg-primary">
          <div class="text-center py-6 px-2">
            <span class="text-xl font-medium text-white">
              {{ formType === 'login' ? '登录' : '注册' }}
            </span>
          </div>
        </QCardSection>
        <QCardSection>
          <QFab
            color="secondary"
            icon="mdi-plus"
            class="absolute top-0 right-0 translate--1/2"
            :model-value="formType === 'register'"
            @click="toggleFormType()"
          ></QFab>
        </QCardSection>

        <div class="px-xs">
          <AdminLoginForm
            :action="formType"
            @register="toggleFormType()"
          ></AdminLoginForm>
        </div>
      </QCard>
    </QPage>
  </div>
</template>

<style scoped></style>
