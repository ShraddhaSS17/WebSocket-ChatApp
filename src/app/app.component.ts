import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'websocket';

  username?: string;
  message?: string;
  op: any[] =[];
    feedback?: string;

    constructor(private websocketservice:WebsocketService){}
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
this.websocketservice.listen('typing').subscribe((data)=> this.updateFeedback(data));
this.websocketservice.listen('chat').subscribe((data)=> this.updateMessage(data));

      
    }
  updateMessage(data: any): void {
   this.feedback ='';
   if(!!!data) return;
   this.op.push(data)
  }
  updateFeedback(data: any): void {
  this.feedback = `${data} is typing msg`;
  }
    messageTyping(): void{
      console.log(`${this.username} is typing`)
      this.websocketservice.emit('typing', this.username)
    }

    sendMessage(): void{
      console.log({
        message:this.message,
        handle: this.username

      });
      this.websocketservice.emit('chat',{
        message:this.message,
        handle: this.username

      })
      this.message ="";
    }
}
