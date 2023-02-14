/**
 * @function videoUrl
 * @description A function that returns the URL of a video
 * @param key - the key of the video in the video storage
 * @returns the URL of the video
 */

export const videoUrl = (key: string) => {
  key = key.replace('input/', '');
  return `https://ik.imagekit.io/kalibuas/${key}`;
};
