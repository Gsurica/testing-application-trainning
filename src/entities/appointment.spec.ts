import { expect, test } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';

test('create an appointment', () => {

  const startDate = new Date();
  const endsDate = new Date();

  startDate.setDate(startDate.getDate() + 1)
  endsDate.setDate(endsDate.getDate() + 2);

  const appointment = new Appointment({
    customer: 'Jhon Doe',
    startsAt: startDate,
    endsAt: endsDate,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.costumer).toEqual('Jhon Doe');

});

test('cannot create an appointment with end date before start date', () => {

  const startDate = getFutureDate('2022-08-10');
  const endsDate = getFutureDate('2022-08-09');

  startDate.setDate(startDate.getDate() + 2)
  endsDate.setDate(endsDate.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt: startDate,
      endsAt: endsDate,
    });
  }).toThrow();

});

test('cannot create an appointment with start date before now', () => {

  const startDate = new Date();
  const endsDate = new Date();

  startDate.setDate(startDate.getDate() - 1)
  endsDate.setDate(endsDate.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt: startDate,
      endsAt: endsDate,
    });
  }).toThrow();

});