import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  messages: Message[] = [{ name: 'Marius', text: 'addsaddas' }];
  clientToUser = {};
  async create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return message;
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  findAll() {
    return this.messages;
  }
}
