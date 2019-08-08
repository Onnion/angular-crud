import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cleanUp } from 'src/app/modules/common/utils/mask.utils';
import { Address } from '../../models/address/addres.model';

@Injectable()
export class CepService {
    private CEP_URL = 'https://viacep.com.br/ws/';
    private FORMAT = 'json';

    constructor(private http: HttpClient) { }

    private filterAddressFields(address: Address): Address {
        const { cep, logradouro, complemento, bairro, localidade, uf } = address;
        return { cep, logradouro, complemento, bairro, localidade, uf };
    }


    public get(address: Address): Observable<Address> {
        return new Observable((observer) => {
            this.http.get<Address>(`${this.CEP_URL}${cleanUp(address.cep)}/${this.FORMAT}`).subscribe(
                (address) => observer.next(this.filterAddressFields(address)),
                (error: HttpErrorResponse) => observer.error(error)
            );
        });
    }
}
