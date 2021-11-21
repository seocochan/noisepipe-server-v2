import { ModelBase } from '../model.base.interface';

export interface Collection extends ModelBase {
  title: string;
  description?: string;
  // TODO:
  // items: number;
  // comments: number;
  // tags: string[];
  // isBookmarked: boolean;
  // createdBy: User;
}
