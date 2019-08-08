import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../models/client/client.model';
import { DataPersistenceService } from '../../services/data-persistence/data-persistence.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {
  public client: Client;

  constructor(private active: ActivatedRoute, private dataPersistence: DataPersistenceService<Client>) { }

  ngOnInit() {
    const { id } = this.active.snapshot.params;
    this.client = this.dataPersistence.get('client', id);
  }

}
