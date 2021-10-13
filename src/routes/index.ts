import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
