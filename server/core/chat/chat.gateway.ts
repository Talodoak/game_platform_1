import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
@WebSocketGateway(3009, {
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messageService: ChatService) {}
  afterInit(server) {
    Logger.log(`WebSocket init`);
  }

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messageService.create(
      createMessageDto,
      client.id,
    );
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    this.messageService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messageService.identify(name, client.id);
  }
  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = this.messageService.getClientName(client.id);

    client.broadcast.emit('typing', { name, isTyping });
  }
}
