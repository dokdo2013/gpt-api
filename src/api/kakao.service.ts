import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class KakaoService {
  constructor(private readonly configService: ConfigService) {}

  async kogpt(req: any): Promise<any> {
    const apiKey = this.configService.get('KAKAO_API_KEY');
    const apiUrl = 'https://api.kakaobrain.com/v1/inference/kogpt/generation';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `KakaoAK ${apiKey}`,
    };

    const body = {
      prompt: req.prompt,
      max_tokens: req.max_tokens || 512,
      temperature: req.temperature || 0.7,
      top_p: req.top_p || 1,
      n: 1,
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
