import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 默认转换
const defaultFilters = ['page', 'pageSize', 'id', 'userId']

export const QueryToNumber = createParamDecorator(
  (data: Array<string> = [], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    data = [...defaultFilters, ...data];
    data.forEach(filter => {
      if (query.hasOwnProperty(filter)) {
        query[filter] = Number(query[filter])
      }
      if (filter === 'page' && !query[filter]) query[filter] = 1;
      if (filter === 'pageSize' && !query[filter]) query[filter] = 15;
    });
    return query;
  },
);
