import sharp from "sharp";
import fs from "fs/promises";

export async function getBlurDataURL(imageUrl: string) {
  try {
    await fs.access(imageUrl);

    const imageBuffer = await sharp(imageUrl)
      .resize(10)
      .blur(5)
      .toFormat("webp")
      .toBuffer();

    return `data:image/webp;base64,${imageBuffer.toString("base64")}`;
  } catch (error: any) {
    console.log(error.message);
  }
}
