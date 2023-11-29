<script setup lang="ts">
const props = defineProps<{
  readerId: string
}>();
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

if (process.client) {
  watch(
    () => props.readerId,
    async val => {
      const reader = await $fetch(`/api/admin/readers/${val}`);
      form.value = {
        name: reader.name,
        gender: reader.gender,
        password: undefined,
        readerTypeId: undefined,
        libraryCardId: reader.libraryCardId,
        organization: reader.organization,
        phoneNumber: reader.phoneNumber,
        email: reader.email,
        note: reader.note
      };
    },
    { immediate: true }
  );
}

async function handleSubmit() {
  try {
    await $fetch(`/api/admin/readers/${props.readerId}`, {
      method: 'PUT',
      body: {
        ...form.value,
        readerTypeId: form.value?.readerType?.id || undefined
      }
    });
    emit('update:modelValue', false);
    quasar.notify({
      message: '修改成功',
      type: 'positive'
    });
    useAdminReadersRefreshEvent().emit();
  }
  catch (_e) {
    quasar.notify({
      message: '修改失败',
      type: 'negative'
    });
  }
}
</script>

<template>
  <QDialog persistent>
    <QCard>
      <QCardSection>
        <div class="text-h6">修改用户信息</div>
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

            <QInput v-model="form.libraryCardId" label="借书证"></QInput>

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
