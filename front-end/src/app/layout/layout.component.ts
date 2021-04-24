import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  message: string;
  constructor(private chatService: ChatService) { }
  ngOnInit() {
    this.chatService.getSystemIdentity().subscribe((res) => {
      this.chatService.initializeConnection(res['ip']);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}