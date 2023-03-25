import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { KakaoService } from './kakao.service';
import { OpenaiService } from './openai.service';

@Module({
  controllers: [ApiController],
  providers: [OpenaiService, KakaoService],
})
export class ApiModule {}
