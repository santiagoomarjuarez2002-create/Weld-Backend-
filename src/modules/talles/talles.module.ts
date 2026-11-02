import { Module } from '@nestjs/common';
import { TallesService } from './talles.service.js';
import { TallesController } from './talles.controller.js';

@Module({
  controllers: [TallesController],
  providers: [TallesService],
})
export class TallesModule {}
