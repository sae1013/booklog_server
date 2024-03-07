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

  //   사용자가 책을 선택했을 때. DB에 있는지 조회하고 없으면 저장한다
  @Post('select')
  async selectBookByUserHandler(@Req() req, @Res() res, @Body() body) {
    const savedBook = this.bookService.findBookAndSave(body.book);
    return savedBook;
  }
}
