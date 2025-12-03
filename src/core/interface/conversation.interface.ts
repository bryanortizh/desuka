export interface Conversation {
  conversationId: number;
  is_group: boolean;
  messageId: number;
  content: string;
  created_at: Date;
  nickname: string;
  avatar: string;
  avatar_group: string;
  title: string;
}

export interface ConversationCreate {
  userIds: number[];
  isGroup: boolean;
}

export interface ConversationResponse {
  conversationId: number;
  created?: boolean;
  existed?: boolean;
}
