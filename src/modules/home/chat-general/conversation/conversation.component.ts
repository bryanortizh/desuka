import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Conversation } from 'src/core/interface/conversation.interface';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  standalone: false,
})
export class ConversationComponent {
  userId = Number(localStorage.getItem('userId'));
  private destroy$ = new Subject<void>();

  constructor(private chatService: ChatService, private navigate: Router) {}

  users = [
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Kimberly',
      name: 'Kimberly',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Bryan',
      name: 'Bryan',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Alex',
      name: 'Alex',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Ale',
      name: 'Ale',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Cesar',
      name: 'Cesar',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Rodrigo',
      name: 'Rodrigo',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Joe',
      name: 'Joe',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Pedro',
      name: 'Pedro',
    },
    {
      img: 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Lucy',
      name: 'Lucy',
    },
  ];
  chats: Conversation[] = [];
  ionViewWillEnter() {
    this.getConversation();
    this.chatService.userjoinConversation(this.userId);
    this.chatService.listenForMessagesforConversation().subscribe((data) => {
      this.getConversation();
    });
  }

  getConversation() {
    this.chatService
      .getConversation(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.chats = results;
        },
        error: (err) => {
          console.error('Error al buscar música:', err);
        },
      });
  }

  goChat(conversation: Conversation) {
    this.navigate.navigate(['home/chat/' + conversation.conversationId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    this.userId = 0;
  }
}
