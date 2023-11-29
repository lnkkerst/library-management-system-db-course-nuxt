<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

const quasar = useQuasar();

const readerTypes = useReaderTypes();

const form = ref<any>({
  name: '',
  gender: '',
  password: '',
  readerTypeId: undefined,
  libraryCardId: false,
  organization: '',
  phoneNumber: '',
  email: '',
  note: ''
});

async function handleSubmit() {
  try {
    await $fetch('/api/admin/readers', {
      method: 'POST',
      body: {
        ...form.value,
        readerTypeId: form.value.readerType?.id ?? undefined
      }
    });
    emit('update:modelValue', false);
    quasar.notify({
      message: '创建成功',
      type: 'positive'
    });
    useAdminReadersRefreshEvent().emit();
  }
  catch (_e) {
    quasar.notify({
      message: '创建失败',
      type: 'negative'
    });
  }
}
</script>

<template>
  <QDialog persistent>
    <QCard>
      <QCardSection>
        <div class="text-h6">创建新读者</div>
        <div>
          <QForm>
            <QInput v-model="form.name" label="读者名称"></QInput>
            <QSelect
              v-model="form.readerType"
              :options="readerTypes.data.value ?? []"
              option-label="name"
              option-value="id"
              label="用户类型"
            ></QSelect>

            <QInput v-model="form.password" label="密码"></QInput>

            <QSelect
              v-model="form.gender"
              label="性别"
              :options="useGenderList().value"
            ></QSelect>

            <QCheckbox
              v-model="form.libraryCardId"
              class="mt-4 mb-2"
              label="是否发放借书证"
            ></QCheckbox>

            <QInput v-model="form.organization" label="单位"></QInput>

            <QInput v-model="form.phoneNumber" label="电话号码"></QInput>

            <QInput v-model="form.email" label="邮箱"></QInput>

            <QInput v-model="form.note" label="备注"></QInput>

            <div class="flex mt-sm">
              <QBtn
                type="submit"
                color="primary"
                label="确定"
                @click.prevent="handleSubmit()"
              ></QBtn>
              <div class="flex-grow"></div>
              <QBtn
                label="取消"
                @click="emit('update:modelValue', false)"
              ></QBtn>
            </div>
          </QForm>
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>

<style scoped></style>
