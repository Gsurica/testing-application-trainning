import { Appointment } from "../entities/appointment";

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverLappingAppointment(startsAt: Date, endsDate: Date): Promise<Appointment | null>;
}