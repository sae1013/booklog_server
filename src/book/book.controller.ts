import { Controller, Get, Post, Query, Req, Res, Body } from '@nestjs/common';
import { BookService } from './book.service';
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // 책 조회
  @Get('search/naver')
  async searchBookHandler(@Req() req, @Res() res, @Query() query) {
    const result = await this.bookService.searchBookByNaver(query);
    return res.send(result);
  }

  // 사용자가 책을 선택했을 때.
  //   @Post('select')
  //   async selectBookByUserHandler(@Req() req, @Res() res, @Body() body) {
  //     const book = this.bookService.findBookBySearchOption();
  //     // save to DB
  //   }

  // 검색 API 책을 DB에 저장할 때.
  @Post('register')
  async registerBookToDBHandler(@Req() req, @Res() res, @Body() body) {}
}
