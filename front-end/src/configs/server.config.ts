import { HttpHeaders } from '@angular/common/http';


export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = '/api/';