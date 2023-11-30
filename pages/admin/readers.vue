<script setup lang="ts">
definePageMeta({
  name: 'admin-readers'
});

const readerTypes = useReaderTypes();
const page = ref(1);
const size = ref(20);
const sizeOptions = ref(
  Array.from({ length: 5 }, (_, index) => 20 * (index + 1))
);
const form = ref<any>({
  name: '',
  userTypeId: undefined
});
const { data, refresh, pending } = await useFetch('/api/admin/readers', {
  query: computed(() => ({
    offset: (page.value - 1) * size.value,
    limit: size.value,
    name: form.value.name,
    readerTypeId: form.value.readerTypeId?.id || undefined,
    gender: form.value.gender,
    libraryCardId: form.value.libraryCardId,
    organization: form.value.organization,
    phoneNumber: form.value.phoneNumber,
    email: form.value.email,
    note: form.value.note
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

useAdminReadersRefreshEvent().on(() => refresh());
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

            <AdminReaderCreateButton></AdminReaderCreateButton>

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
                  <QInput
                    v-model.lazy="form.name"
                    type="text"
                    label="读者名称"
                  ></QInput>

                  <QSelect
                    v-model="form.readerTypeId"
                    :options="readerTypes.data.value ?? []"
                    option-label="name"
                    option-value="id"
                    label="读者类型"
                  ></QSelect>

                  <QSelect
                    v-model="form.gender"
                    :options="useGenderList().value"
                    label="性别"
                  ></QSelect>

                  <QInput
                    v-model.lazy="form.libraryCardId"
                    label="借书证卡号"
                  ></QInput>

                  <QInput
                    v-model.lazy="form.organization"
                    label="单位"
                  ></QInput>

                  <QInput
                    v-model.lazy="form.phoneNumber"
                    label="手机号"
                  ></QInput>

                  <QInput v-model.lazy="form.email" label="电子邮箱"></QInput>

                  <QInput v-model.lazy="form.note" label="备注"></QInput>
                </div>
              </QForm>
            </div>
          </QExpansionItem>
        </QCardSection>
      </QCard>

      <QMarkupTable class="mt-sm" separator="cell">
        <thead>
          <tr>
            <th>读者名称</th>
            <th>读者类型</th>
            <th>性别</th>
            <th>借书卡卡号</th>
            <th>单位</th>
            <th>手机号</th>
            <th>邮箱</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="reader in data?.data" :key="reader.id">
            <tr>
              <td>{{ reader.name }}</td>
              <td>{{ readerTypes.idMap.value[reader.readerTypeId] }}</td>
              <td>{{ reader.gender }}</td>
              <td>{{ reader.libraryCardId }}</td>
              <td>{{ reader.organization }}</td>
              <td>{{ reader.phoneNumber }}</td>
              <td>{{ reader.email }}</td>
              <td>{{ reader.note }}</td>
              <td class="w-30">
                <AdminReaderOperationButtonGroup
                  :reader-id="reader.id"
                ></AdminReaderOperationButtonGroup>
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
