import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MessageEntity } from '../../services/message.model';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: MessageEntity[] = [];
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 5; // Nombre d'éléments par page
  paginationId = 'partners-pagination';
  isDetailsMessageOpen = false;
  selectedMessage: any;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages() {
    this.messageService.getMessages(this.currentPage - 1, this.itemsPerPage)
      .subscribe(response => {
        this.messages = response.content;  // Liste paginée des messages
        this.totalItems = response.totalElements; // Total des messages dans la BD
      });
  }

  pageChanged(event: number) {
    this.currentPage = event;
    this.loadMessages();
  }
  openDetailMessage(message: any) {
    this.selectedMessage = message;
    this.isDetailsMessageOpen = true;
  }

  // Fermer la modale
  closeDetailMessage() {
    this.isDetailsMessageOpen = false;
    this.selectedMessage = null;
  }
}
