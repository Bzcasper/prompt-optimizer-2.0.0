import { CONTENT_TEMPLATES } from './content-templates';
import { VIDEO_TEMPLATES } from './video-templates';
import { IMAGE_TEMPLATES } from './image-templates';
import { IMAGE_OPTIMIZE_TEMPLATES } from './image-optimize';
import { ITERATE_TEMPLATES } from './iterate';
import { OPTIMIZE_TEMPLATES } from './optimize';
import { USER_OPTIMIZE_TEMPLATES } from './user-optimize';

export const ALL_TEMPLATES = {
  ...CONTENT_TEMPLATES,
  ...VIDEO_TEMPLATES,
  ...IMAGE_TEMPLATES,
  ...IMAGE_OPTIMIZE_TEMPLATES,
  ...ITERATE_TEMPLATES,
  ...OPTIMIZE_TEMPLATES,
  ...USER_OPTIMIZE_TEMPLATES,
};