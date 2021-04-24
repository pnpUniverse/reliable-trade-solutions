import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  constructor(private http: HttpClient) {
    this.socket = io(this.url,{ transport : ['websocket'] });
    this.socket.emit('join', 'admin');
  }

  public getSystemIdentity() {
    return this.http.get(`https://api.ipify.org/?format=json`).pipe(map(res => {
      return res;
    }), catchError((err) => {
      throw new Error(err.message);
    }));
  }

  public requestCurrentPair(){
    this.socket.emit('current pair');
  }

  public checkNodeAvailiblity(node_identity){
    this.socket.emit('check node availiblity', node_identity);
  }

  public resetNodeCalls(){
    this.socket.emit('reset node call');
  }

  public disconnectCall(pair){
    this.socket.emit('disconnect call', pair);
  }

  public getCurrentPair = () => {
    return Observable.create((observer) => {
        this.socket.on('current pair to admin', (currentPair) => {
          observer.next(currentPair);
        });
    });
  }

  public updtedClientStatus = () => {
    return Observable.create((observer) => {
        this.socket.on('update client status', (status) => {
          observer.next(status);
        });
    });
  }
}