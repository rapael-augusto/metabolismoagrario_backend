import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateCultivarReviewDto } from './dto/update-cultivar-review.dto';
import { CultivarReviewService } from './cultivarReview.service';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';

@Controller('review')
export class CultivarReviewController {
  constructor(private readonly cultivarReviewService: CultivarReviewService) {}

  @Put(':reviewId')
  async update(
    @Param('reviewId') reviewId: string,
    @CurrentUser() user: User,
    @Body() data: UpdateCultivarReviewDto,
  ) {
    return await this.cultivarReviewService.update(reviewId, user, data);
  }
}
