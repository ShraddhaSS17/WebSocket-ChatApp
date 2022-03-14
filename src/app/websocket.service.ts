import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: io.Socket
  constructor() {
     this.socket =io.connect('http://localhost:3000',{ transports: ['websocket', 'polling', 'flashsocket'] })
   }
   listen(eventname: string): Observable<any> { 
     return new Observable((subscribe)=>{
       this.socket.on(eventname, (data)=>{
         subscribe.next(data)
       })
     })
   }
   emit(eventname: string, data:any){
     this.socket.emit(eventname,data);
   }
    
}
