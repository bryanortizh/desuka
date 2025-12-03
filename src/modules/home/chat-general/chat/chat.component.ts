import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MessageResponse } from 'src/core/interface/message.interface';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false,
})
export class ChatComponent {
  messages: MessageResponse[] = [];
  newMessage = '';
  myUserId = Number(localStorage.getItem('userId'));
  conversationId = 0;
  conversationTitle = 'Chat';
  private destroy$ = new Subject<void>();

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private navigate: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('conversationId');
      if (id && id !== '0') {
        this.conversationId = Number(id);
      }
      this.loadMessages();
    });
    this.chatService.joinConversation(this.conversationId);
    this.chatService.listenForMessages().subscribe((data) => {
      this.loadMessages();
    });
  }

  loadMessages() {
    this.chatService
      .getMessages(this.conversationId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.messages = results;
          setTimeout(() => this.scrollToBottom(), 100);
        },
        error: (err) => {
          console.error('xdd', err);
        },
      });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.chatService.sendMessage({
      conversacionId: this.conversationId,
      userId: this.myUserId,
      content: this.newMessage,
    });
    this.newMessage = '';
  }
  ngOnDestroy() {
     this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  
  backSteep() {
    this.navigate.navigate(['/home/system']);
  }
}
