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

  async registerBookToDB(book) {
    this.bookRepository.save(book);
  }
  //   async findBookByISBN(queryParams: any) {
  //     // Provider에 맞게 쿼리스트링 만들어주는것 필요.
  //     const title = queryParams.title.replace(/\r\n/g, '') || '';
  //     const isbn = queryParams.isbn;
  //     const display = queryParams.display || 10; // max 100
  //     const start = queryParams.start || 1; // max: 1000
  //     const sort = queryParams.sort === 'date' ? 'date' : 'sim'; // option: date:날짜 내림차순, sim: 정확도
  //     const NAVER_BOOK_SEARCH_URL =
  //       'https://openapi.naver.com/v1/search/book_adv.json';

  //     const response = await axios.get(
  //       `${NAVER_BOOK_SEARCH_URL}?d_titl=${title}&display=${display}&start=${start}&sort=${sort}`,
  //       {
  //         headers: {
  //           'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  //           'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET_KEY,
  //         },
  //       },
  //     );
  //     return response.data.items;
  //   }
}
