import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ErrorMessageMap, defaultErrorMessageMap } from '@/shared/constant/error';
import { ERROR_MESSAGE_MAP } from '@/shared/constant/metadata-key';

export const HandleErrorMessage = (errorMessageMap: ErrorMessageMap = {}) => {
  return applyDecorators(
    SetMetadata(ERROR_MESSAGE_MAP, { ...defaultErrorMessageMap, ...errorMessageMap })
  )
}
