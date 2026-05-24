import { configure, create } from 'adorable-log';

configure({
  enabled: process.env.NODE_ENV !== 'production',
  namespaces: {
    API: { color: '#3498DB' },
  },
});

export const apiLog = create('API');
