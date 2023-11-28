import { ofetch } from 'ofetch';

export default defineNuxtPlugin(_nuxtApp => {
  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      const user = useUserStore();

      if (user.token) {
        options.headers = { Authorization: `Bearer ${user.token}` };
      }
    },
    onRequestError({ error }) {
      console.error(error);
    }
  });
});
