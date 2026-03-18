import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

const imageFileFilter = (
  _req: unknown,
  file: Express.Multer.File,
  cb: (err: Error | null, acceptFile: boolean) => void,
) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException('JPEG, PNG, WEBP 이미지만 업로드 가능합니다.'),
      false,
    );
  }
};

export const ImageUpload = (fieldName = 'image') =>
  applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: memoryStorage(),
        fileFilter: imageFileFilter,
        limits: { fileSize: 10 * 1024 * 1024 },
      }),
    ),
  );

export const ImagesUpload = (fieldName = 'images', maxCount = 5) =>
  applyDecorators(
    UseInterceptors(
      FilesInterceptor(fieldName, maxCount, {
        storage: memoryStorage(),
        fileFilter: imageFileFilter,
        limits: { fileSize: 10 * 1024 * 1024 },
      }),
    ),
  );
