import {} from '#imports';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip
} from 'chart.js';
import { NuxtLayout, NuxtLoadingIndicator, NuxtPage } from '#components';

export default defineComponent(() => {
  if (process.client) {
    Notify.setDefaults({
      position: 'bottom-right'
    });

    ChartJS.register(
      RadialLinearScale,
      ArcElement,
      Tooltip,
      Legend,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement
    );
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
