<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

const quasar = useQuasar();

const bookTypes = useBookTypes();

const form = ref<any>({});

async function handleSubmit() {
  try {
    await $fetch('/api/admin/books', {
      method: 'POST',
      body: {
        ...form.value,
        bookTypeId: form.value.bookTypeId?.id ?? undefined,
        publishAt: new Date(form.value.publishAt)
      }
    });
    emit('update:modelValue', false);
    quasar.notify({
      message: '创建成功',
      type: 'positive'
    });
    useAdminBooksRefreshEvent().emit();
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
        <div class="text-h6">创建新图书</div>
        <div>
          <QForm>
            <QInput v-model.lazy="form.name" label="图书名称"></QInput>
            <QInput v-model.lazy="form.isbn" label="ISBN"></QInput>
            <QInput v-model.lazy="form.author" label="作者"></QInput>
            <QInput v-model.lazy="form.publisher" label="出版社"></QInput>
            <QInput
              v-model.lazy="form.publishAt"
              type="date"
              label="出版日期"
            ></QInput>
            <QSelect
              v-model.lazy="form.bookTypeId"
              :options="bookTypes.data?.value ?? []"
              option-label="name"
              option-value="value"
              label="图书类型"
            ></QSelect>
            <QInput v-model.lazy="form.indexNumber" label="索书号"></QInput>
            <QInput
              v-model.lazy="form.price"
              type="number"
              label="价格"
            ></QInput>
            <QInput
              v-model.lazy="form.pages"
              type="number"
              label="页数"
            ></QInput>
            <QInput v-model.lazy="form.summary" label="简介"></QInput>
            <QInput
              v-model.lazy="form.amount"
              type="number"
              label="数量"
            ></QInput>

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
