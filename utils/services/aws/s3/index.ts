import aws from 'aws-sdk';
import { Json } from '../../../types/database';

const s3 = new aws.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const uploadFile = async (file: {
  spaceId: {
    id: string;
    created_at: string | null;
    modified_at: string | null;
    name: string | null;
    title: string | null;
    message: string | null;
    questions: { question: string }[];
    logo_image: string | null;
    isVideoOnly: boolean | null;
    isUserConsent: boolean | null;
    isRating: boolean | null;
    links: Json[] | null;
  };
  data: Blob;
  userId: string;
}) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Key: `input/${file.userId}-${file.spaceId}-${Date.now()}.webm`,
    Body: file.data,
    ContentType: `video/webm`,
  };
  return await s3.upload(params).promise();
};

export const deleteFile = async (key: string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Key: key,
  };
  return await s3.deleteObject(params).promise();
};

export const getFile = async (key: string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Key: key,
  };
  return await s3.getObject(params).promise();
};

export const getFileWithSignedUrl = async (key: string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Key: key,
    Expires: 60 * 5,
  };
  return await s3.getSignedUrlPromise('getObject', params);
};
