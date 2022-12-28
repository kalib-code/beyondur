export const videoUrl = ( key: string ) => {
    key = key.replace ( 'input/', '' );
    return `https://ik.imagekit.io/kalibuas/${key}`
}
