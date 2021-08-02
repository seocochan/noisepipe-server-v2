import { BaseEntityProps } from 'src/core/base-classes/entity.base';
import { IdResponse } from '../dtos/id.response.dto';

export class ResponseBase extends IdResponse {
  constructor(entity: BaseEntityProps) {
    super(entity.id?.value);
    this.createdAt = (entity.createdAt?.value).toISOString();
    this.updatedAt = (entity.updatedAt?.value).toISOString();
  }

  /**
   * @example '2020-11-24T17:43:15.970Z'
   */
  createdAt: string;

  /**
   * @example '2020-11-24T17:43:15.970Z'
   */
  updatedAt: string;
}
