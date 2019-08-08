import { Address } from '../address/addres.model';
// import { Vehicle } from '../vehicle/vehicle.model';

export interface Client {
    readonly name: string;
    readonly cpf: string;
    readonly phone: string;
    readonly birthdate: string;
    readonly address: Address;
    id?: string;
    // readonly vehicle: Vehicle;
}
