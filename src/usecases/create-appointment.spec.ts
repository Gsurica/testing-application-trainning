import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoeyrAppointmentsRepository } from "../repositories/in-memory/in-memory-appointment-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {

    const appointmentsRepository = new InMemoeyrAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');
    
    startsAt.setDate(startsAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2);
    
    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    })).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    
    const appointmentsRepository = new InMemoeyrAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-15');

    await createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt,
      endsAt
    });
  
    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error);

      
    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error);

    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-17')
    })).rejects.toBeInstanceOf(Error);

    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error);


  });
});