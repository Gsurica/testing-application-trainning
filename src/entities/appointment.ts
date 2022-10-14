export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  get costumer () {
    return this.props.customer;
  }

  get startsAt () {
    return this.props.startsAt;
  }

  get endsAt () {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {

    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error('invalid start date');
    }

    if (endsAt <= startsAt) {
      throw new Error('invalid end date');
    }

    this.props = props;
  }
}