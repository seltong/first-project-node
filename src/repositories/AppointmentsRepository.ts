import { isEqual } from 'date-fns';
import Appointment from '../models/appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class ApointmentsRespository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public all(): Array<Appointment> {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }
}

export default ApointmentsRespository;
