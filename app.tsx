import {} from '#imports';
import { NuxtLayout, NuxtLoadingIndicator, NuxtPage } from '#components';

export default defineComponent(() => {
  if (process.client) {
    Notify.setDefaults({
      position: 'bottom-right'
    });
  }

  return () => (
    <div>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  );
});
