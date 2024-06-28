import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import Mint from 'mint-filter'
import * as _ from 'lodash';
import { sensitiveWords } from '@/shared/constant/sensitive-words';

const mint = new Mint(sensitiveWords);

type SensitiveWordFilterMap = {
  filterKey: string, // 可以为 a.b.c 的形式，解析为：body['a']['b']['c']
  errorMessage?: string,
}

export const SensitiveWordFilteredBody = createParamDecorator(
  (data: Array<SensitiveWordFilterMap>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if (!data.length) return body;
    data.forEach(filter => {
      const word: string = _.at(body, filter.filterKey)[0];
      const verifyRes = mint.verify(word);
      if (!verifyRes) throw new BadRequestException(filter.errorMessage || '请不要输入敏感词');
    });

    return body;
  },
);
