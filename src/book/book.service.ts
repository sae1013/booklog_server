import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { SearchBookProvider } from './types';
import { makeQueryString } from 'src/utils/utils';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  //TODO: Nest.js Http module 리팩토링하기,
  async searchBookByNaver(queryParams) {
    const title = (queryParams.title || '').replace(/\r\n/g, '') || '';
    const isbn = queryParams.isbn || '';
    const display = queryParams.display || 10; // max 100
    const start = queryParams.start || 1; // max: 1000
    const sort = queryParams.sort === 'date' ? 'date' : 'sim'; // option: date:날짜 내림차순, sim: 정확도
    const NAVER_BOOK_SEARCH_URL =
      'https://openapi.naver.com/v1/search/book_adv.json';

    const response = await axios.get(
      `${NAVER_BOOK_SEARCH_URL}?${makeQueryString({ d_titl: title, d_isbn: isbn, sort, start, display })}`,
      {
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET_KEY,
        },
      },
    );
    const { lastBuildDate, ...data } = response.data;
    return data;
  }

  async findBookAndSave(book) {
    const foundBook = await this.bookRepository.findOne(book.id);
    if (foundBook) {
      return foundBook;
    }
    this.bookRepository.create(book);
    const savedBook = await this.bookRepository.save(book);
    return savedBook;
  }

  async findBookByTitle(title: string) {}
  async findBookByISBN(isbn: string) {}
}
