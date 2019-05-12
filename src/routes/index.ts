import apiRoutes from '@routes/api';
import eventRoutes from '@routes/event';
import jobRoutes from '@routes/jobs';
import socketRoutes from '@routes/socket';
import webRoutes from '@routes/web';

export default {
  api: apiRoutes,
  event: eventRoutes,
  jobs: jobRoutes,
  socket: socketRoutes,
  web: webRoutes,
};
