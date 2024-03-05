import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(postService: PostService) {}
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getPost() {
    return { id: 'EGEGMEGK', content: 'asefh' };
  }
  //   @Get('/:id')
  //   getPost() {}

  @Post('')
  writePost() {}
}
