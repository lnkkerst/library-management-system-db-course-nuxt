<script setup lang="ts">
import { useAdminBooksRefreshEvent } from '~/composables/events';

definePageMeta({
  name: 'admin-books'
});

const bookTypes = useBookTypes();
const page = ref(1);
const size = ref(20);
const sizeOptions = ref(
  Array.from({ length: 5 }, (_, index) => 20 * (index + 1))
);
const form = ref<any>({});
const { data, refresh, pending } = await useFetch('/api/admin/books', {
  query: computed(() => ({
    offset: (page.value - 1) * size.value,
    limit: size.value,
    name: form.value.name,
    isbn: form.value.isbn,
    author: form.value.author,
    publisher: form.value.publisher,
    bookTypeId: form.value.bookTypeId?.id,
    indexNumber: form.value.indexNumber,
    price: form.value.price,
    pages: form.value.pages,
    summary: form.value.summary,
    amount: form.value.amount
  })),
  lazy: false
});
const totalCount = ref(data.value?.totalCount ?? 0);
const maxPage = computed(() => {
  return Math.floor((totalCount.value + size.value - 1) / size.value);
});
const expanded = ref(false);
const toggleExpanded = useToggle(expanded);

watch(
  () => data.value,
  val => {
    totalCount.value = val?.totalCount ?? 0;
  }
);

useAdminBooksRefreshEvent().on(() => refresh());
</script>

<template>
  <div>
    <QPage padding>
      <QCard>
        <QCardSection>
          <div class="flex">
            <QBtn
              icon="mdi-filter"
              color="primary"
              outline
              label="筛选"
              @click="toggleExpanded()"
            ></QBtn>

            <div class="flex-grow"></div>

            <AdminBookCreateButton></AdminBookCreateButton>

            <QBtn
              class="ml-sm"
              color="secondary"
              round
              icon="mdi-refresh"
              @click="refresh()"
            ></QBtn>
          </div>

          <QExpansionItem v-model="expanded" class="expansion-collapse">
            <div class="mt-sm">
              <QForm>
                <div
                  class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
                >
                  <QInput v-model.lazy="form.name" label="图书名称"></QInput>
                  <QInput v-model.lazy="form.isbn" label="ISBN"></QInput>
                  <QInput v-model.lazy="form.author" label="作者"></QInput>
                  <QInput v-model.lazy="form.publisher" label="出版社"></QInput>
                  <QSelect
                    v-model.lazy="form.bookTypeId"
                    :options="bookTypes.data?.value ?? []"
                    option-label="name"
                    option-value="value"
                    label="图书类型"
                  ></QSelect>
                  <QInput
                    v-model.lazy="form.indexNumber"
                    label="索引号码"
                  ></QInput>
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
                </div>
              </QForm>
            </div>
          </QExpansionItem>
        </QCardSection>
      </QCard>

      <QMarkupTable class="mt-sm" separator="cell">
        <thead>
          <tr>
            <th>图书名称</th>
            <th>图书类型</th>
            <th>ISBN</th>
            <th>作者</th>
            <th>出版社</th>
            <th>出版日期</th>
            <th>索引号码</th>
            <th>价格</th>
            <th>页数</th>
            <th>简介</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="book in data?.data" :key="book.id">
            <tr>
              <td>{{ book.name }}</td>
              <td>{{ bookTypes.idMap.value[book.bookTypeId] }}</td>
              <td>{{ book.isbn }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.publisher }}</td>
              <td>{{ new Date(book.publishAt).toLocaleDateString() }}</td>
              <td>{{ book.indexNumber }}</td>
              <td>{{ book.price }}</td>
              <td>{{ book.pages }}</td>
              <td>{{ book.summary }}</td>
              <td>{{ book.amount }}</td>

              <td class="w-30">
                <AdminBookOperationButtonGroup
                  :book-id="book.id"
                ></AdminBookOperationButtonGroup>
              </td>
            </tr>
          </template>
        </tbody>

        <QInnerLoading :showing="pending">
          <QSpinnerGears size="50px" color="primary" />
        </QInnerLoading>
      </QMarkupTable>

      <div class="flex px-2 py-1 items-center gap-2">
        <div class="flex-grow"></div>

        <div class="flex items-center gap-1">
          <span>共 {{ totalCount }} 条数据，每页显示</span>
          <QSelect
            v-model="size"
            :options="sizeOptions"
            dense
            borderless
          ></QSelect>
          <span>条</span>
        </div>
        <QPagination v-model="page" input :max="maxPage"></QPagination>
      </div>
    </QPage>
  </div>
</template>

<style lang="scss"></style>
