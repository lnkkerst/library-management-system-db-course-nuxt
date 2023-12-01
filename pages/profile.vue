<script setup lang="ts">
definePageMeta({
  name: 'reader-profile',
  layout: 'reader'
});

const quasar = useQuasar();
const readerTypes = useReaderTypes();

const form = ref<any>({});
const loading = ref(false);

async function handleSubmit() {
  loading.value = true;
  try {
    await $fetch('/api/reader', {
      method: 'PUT',
      body: form.value
    });
    quasar.notify({
      message: '更新成功',
      type: 'postive'
    });
  }
  catch (_e) {
    quasar.notify({
      message: '更新失败',
      type: 'negative'
    });
  }
  finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const reader = await $fetch('/api/reader');
  form.value = {
    ...reader,
    readerTypeId: {
      id: reader.readerTypeId,
      name: readerTypes.idMap.value[reader.readerTypeId]
    }
  };
});
</script>

<template>
  <div>
    <QPage padding>
      <QCard>
        <QCardSection>
          <div class="text-h6">修改用户信息</div>
          <div>
            <QForm>
              <QInput v-model="form.name" disable label="读者名称"></QInput>

              <QSelect
                v-model="form.readerTypeId"
                disable
                :options="readerTypes.data.value ?? []"
                option-label="name"
                option-value="id"
                label="读者类型"
              ></QSelect>

              <QInput
                v-model="form.password"
                label="密码"
                type="password"
              ></QInput>

              <QSelect
                v-model="form.gender"
                label="性别"
                :options="useGenderList().value"
              ></QSelect>

              <QInput
                v-model="form.libraryCardId"
                disable
                label="借书证"
              ></QInput>

              <QInput v-model="form.organization" label="单位"></QInput>

              <QInput v-model="form.phoneNumber" label="电话号码"></QInput>

              <QInput v-model="form.email" label="邮箱"></QInput>

              <QInput v-model="form.note" label="备注"></QInput>

              <div class="flex mt-sm">
                <QBtn
                  type="submit"
                  color="primary"
                  label="确定"
                  :loading="loading"
                  @click.prevent="handleSubmit()"
                ></QBtn>
                <div class="flex-grow"></div>
              </div>
            </QForm>
          </div>
        </QCardSection>
      </QCard>
    </QPage>
  </div>
</template>

<style scoped></style>
