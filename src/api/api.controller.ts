import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KakaoService } from './kakao.service';
import { OpenaiService } from './openai.service';

@Controller('api')
@ApiTags('api')
export class ApiController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly kakaoService: KakaoService,
  ) {}

  @Post('chatgpt-plus')
  async chatgptPlus(@Body() body: any): Promise<any> {
    return this.openaiService.chatgptPlus(body);
  }

  @Post('openai-gpt3')
  async openaiGpt3(@Body() body: any): Promise<any> {
    return this.openaiService.openaiGpt3(body);
  }

  @Post('kogpt')
  async kogpt(@Body() body: any): Promise<any> {
    return this.kakaoService.kogpt(body);
  }
}
