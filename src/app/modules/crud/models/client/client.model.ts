import * as moment from 'moment';
import { Vehicle } from '../vehicle/vehicle.model';

export interface Client {
    id?: string;
    name: string;
    age: string;
    cpf: string;
    phone: string;
    birthdate: moment.Moment;
    vehicle: Vehicle;
}
