function useGenderList() {
  return ref<string[]>(['男', '女', '其他', '保密']);
}

export { useGenderList };
