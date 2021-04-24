import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = 'https://192.168.3.108:3000';
  socket: any; // = io(this.url,{ transport : ['websocket'] });
  constructor(private http: HttpClient) {
    // socket = io(this.url,{ transport : ['websocket'] });
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getSystemIdentity() {
    return this.http.get(`https://api.ipify.org/?format=json`).pipe(map(res => {
      return res;
    }), catchError((err) => {
      throw new Error(err.message);
    }));
  }

  public initializeConnection(message) {
    this.socket.emit('new_connection', message);
  }
}
