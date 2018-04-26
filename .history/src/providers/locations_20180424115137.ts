import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LocationsProvider Provider');
  }

}
