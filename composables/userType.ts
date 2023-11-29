export function useUserTypes() {
  const data = useFetch('/api/admin/user-types');
  const idMap = computed<Record<string, string>>(() => {
    if (!data.data.value) {
      return {};
    }
    const res: Record<string, string> = {};
    for (const userType of data.data.value) {
      res[userType.id] = userType.name;
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
