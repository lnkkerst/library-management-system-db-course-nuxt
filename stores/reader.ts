export const useReaderStore = defineStore(
  'reader',
  () => {
    const token = ref<string>();
    const reader = ref();

    async function login({
      username,
      password
    }: {
      username: string
      password: string
    }) {
      const res = await $fetch('/api/login', {
        method: 'POST',
        body: { username, password }
      });
      reader.value = res.reader;
      token.value = res.accessToken;
      useCookie('readerAccessToken').value = token.value;
    }

    async function logout() {
      reader.value = undefined;
      token.value = undefined;
      useCookie('readerAccessToken').value = token.value;
    }

    return { token, login, reader, logout };
  },
  {
    persist: process.client
      ? {
          storage: localStorage
        }
      : false
  }
);
