import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OpenaiService {
  constructor(private readonly configService: ConfigService) {}

  async chatgptPlus(req: any): Promise<any> {
    const apiKey = this.configService.get('OPENAI_API_KEY');
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const body = {
      messages: req.messages,
      temperature: Number(req.temperature) || 0.7,
      max_tokens: Number(req.max_tokens) || 256,
      top_p: Number(req.top_p) || 1,
      frequency_penalty: Number(req.frequency_penalty) || 0,
      presence_penalty: Number(req.presence_penalty) || 0,
      model: req.model || 'gpt-3.5-turbo',
      stream: false,
    };

    const response = await axios
      .post(apiUrl, body, { headers: headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });

    return response;
  }

  async openaiGpt3(req: any): Promise<any> {
    const apiKey = this.configService.get('OPENAI_API_KEY');
    const apiUrl = 'https://api.openai.com/v1/completions';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const body = {
      prompt: req.prompt,
      temperature: Number(req.temperature) || 0.7,
      max_tokens: Number(req.max_tokens) || 256,
      top_p: Number(req.top_p) || 1,
      frequency_penalty: Number(req.frequency_penalty) || 0,
      presence_penalty: Number(req.presence_penalty) || 0,
      model: req.model || 'text-davinci-003',
      stream: false,
    };

    const response = await axios
      .post(apiUrl, body, { headers: headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });

    return response;
  }
}
