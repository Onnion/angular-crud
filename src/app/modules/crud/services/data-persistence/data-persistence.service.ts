import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v1';

export interface GenericId {
  id?: string;
}

@Injectable()
export class DataPersistenceService<T extends GenericId> {

  constructor() { }

  public create(entity: string, data: T): void {
    const $entity = localStorage.getItem(entity);
    const $$entity = $entity ? [...JSON.parse($entity), { ...data, id: uuid() }] : [{ ...data, id: uuid() }];
    localStorage.setItem(entity, JSON.stringify($$entity));
  }

  public read(entity: string): T[] {
    return JSON.parse(localStorage.getItem(entity));
  }

  public get(entity: string, id: string = null): T {
    let result = JSON.parse(localStorage.getItem(entity));

    try {
      if (id) {
        result = result.filter((client: T) => {
          return client.id === id;
        });
      }
    } catch (error) {
      console.log(error);
    }

    return result[0];
  }

  public update(entity: string, data: T): void {
    const clients = this.read(entity);
    let index: number;

    try {
      index = clients.findIndex((client) => client.id === data.id);
      clients[index] = data;
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem(entity, JSON.stringify(clients));
  }

  public delete(entity: string, data: T): void {
    const clients = this.read(entity);
    let clientsExceptOne = clients;

    try {
      clientsExceptOne = clients.filter((client) => client.id !== data.id);
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem(entity, JSON.stringify(clientsExceptOne));
  }

}
