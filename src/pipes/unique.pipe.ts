import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { camelCaseToUnderScores } from '@/shared/util/str';

type UniqueParams = {
  selector: object,
  errorMessage: string,
  model: any,
}

/**
 * 用于：防止innodb行锁 + unique导致ID自增发生跳跃（用户量大的场景/被恶意刷，可能导致ID溢出）
 * 注意：高并发场景，需要锁
 */
@Injectable()
export class UniquePipe implements PipeTransform {
  constructor(
    private uniqueParams: UniqueParams,
    private useDefaultIsDelete: boolean = true
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'custom') return value;
    const selector = this.uniqueParams.selector;
    if (this.useDefaultIsDelete) {
      selector['isDelete'] = 0;
    }
    const $where = {};
    Object.keys(selector).forEach(key => {
      $where[camelCaseToUnderScores(key)] = key === 'isDelete' ? selector[key] : value[selector[key]];
    })
    const res = await this.uniqueParams.model.findOne({ where: $where });
    // 不存在
    if (!res) return value;
    throw new BadRequestException(this.uniqueParams.errorMessage);
  }
}
