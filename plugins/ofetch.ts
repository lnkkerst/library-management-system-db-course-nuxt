import { ofetch } from 'ofetch';

export default defineNuxtPlugin(_nuxtApp => {
  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {},
    onResponseError({ response }) {
      if (process.client) {
        if (response.status === 401) {
          Notify.create({
            message: '请先登录',
            type: 'warning',
            position: 'bottom-right'
          });
          useRouter().push({ name: 'admin-login' });
        }
      }
    }
  });
});
