import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/core/enum/endpoints.enum';
import { Conversation } from 'src/core/interface/conversation.interface';
import { Message, MessageResponse } from 'src/core/interface/message.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  token = localStorage.getItem('token') || '';
  environmentUrl = environment.apiUrl;

  constructor(private socket: Socket, private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getConversation(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(
      `${this.environmentUrl}${EndPoints.getAllConversationChat}` + userId,
      { headers: this.getAuthHeaders() }
    );
  }

  getMessages(conversationId: number): Observable<MessageResponse[]> {
    return this.http.get<MessageResponse[]>(
      `${this.environmentUrl}${EndPoints.getAllChatxUser}` + conversationId,
      { headers: this.getAuthHeaders() }
    );
  }

  sendMessages(
    conversationId: number,
    myUserId: number,
    newMessage: string
  ): Observable<MessageResponse[]> {
    const body = {
      conversationId: conversationId,
      userId: myUserId,
      content: newMessage,
    };
    return this.http.post<MessageResponse[]>(
      `${this.environmentUrl}${EndPoints.getAllChatxUser}`,
      body,
      { headers: this.getAuthHeaders() }
    );
  }

  sendMessage(data: any) {
    this.socket.emit('chat:mensaje', data);
  }

  joinConversation(conversationId: number) {
    this.socket.emit('chat:join', conversationId);
  }
  userjoinConversation(userId: number) {
    this.socket.emit('user:join', userId);
  }

  listenForMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('chat:mensaje', (data) => {
        observer.next(data);
      });
    });
  }
  
  listenForMessagesforConversation(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('chat:updateList', (data) => {
        observer.next(data);
      });
    });
  }
}
