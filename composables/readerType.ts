export function useReaderTypes() {
  const data = useFetch('/api/admin/reader-types');
  const idMap = computed<Record<string, string>>(() => {
    if (!data.data.value) {
      return {};
    }
    const res: Record<string, string> = {};
    for (const readerType of data.data.value) {
      res[readerType.id] = readerType.name;
    }
    return res;
  });
  const selectOptions = computed(() => {
    if (!data.data.value) {
      return [];
    }
    return data.data.value.map(({ id, name }) => ({
      label: name,
      value: id
    }));
  });
  return { ...data, idMap, selectOptions };
}
