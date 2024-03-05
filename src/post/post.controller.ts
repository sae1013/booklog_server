import { Controller, Get, Post, Res } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(postService: PostService) {}
  @Get('/:id')
  getPost() {}

  @Post('')
  writePost() {}
}
