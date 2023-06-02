import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
