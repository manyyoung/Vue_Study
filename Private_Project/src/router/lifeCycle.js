import Layout from '@/views/Layout';
import LifeCycle from '@/views/lifeCycle/LifeCycle';
import LifeCycleInfo from '@/views/lifeCycle/LifeCycleInfo';

export default {
  path: '/lifeCyle',
  component: Layout,
  children: [
    {
      path: 'main',
      name: 'LifeCycle',
      component: LifeCycle,
    },
    {
      path: 'info',
      name: 'LifeCycleInfo',
      component: LifeCycleInfo,
    },
  ],
};
