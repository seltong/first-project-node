import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();
const appointments = [];

appointmentsRouter.post('/', (resquest, response) => {
  const { provider, date } = resquest.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
