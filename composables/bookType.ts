export function useBookTypes() {
  const data = useFetch('/api/admin/book-types');
  const idMap = computed<Record<string, string>>(() => {
    if (!data.data.value) {
      return {};
    }
    const res: Record<string, string> = {};
    for (const bookType of data.data.value) {
      res[bookType.id] = bookType.name;
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
