export interface Message {
  conversationId: number;
  userId: number;
  content: string;
}

export interface MessageResponse {
  id: number;
  conversation_id: number;
  user_id: number;
  content: string;
  timestamp: string;
  created_at: string;
  nickname: string;
}
