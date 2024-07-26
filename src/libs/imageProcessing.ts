import sharp from "sharp";

import path from "path";
import fs from "fs/promises";

export async function getBlurContentCover(
  imageUrl: string,
  size: number = 10,
  blur: number = 5,
): Promise<string> {
  const localImagePath = path.join(
    __dirname,
    `../../../../../../../public/${imageUrl}`,
  );

  try {
    await fs.access(localImagePath);

    const imageBuffer = await sharp(localImagePath)
      .resize(size)
      .blur(blur)
      .toFormat("webp")
      .toBuffer();

    return `data:image/webp;base64,${imageBuffer.toString("base64")}`;
  } catch (error: any) {
    throw error;
  }
}

export async function generateBlurContentCover(
  width: number = 800,
  height: number = 800,
  blur: number = 20,
): Promise<string> {
  try {
    const imageBuffer = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0.62 },
      },
    })
      .blur(blur)
      .toFormat("webp")
      .toBuffer();

    return `data:image/webp;base64,${imageBuffer.toString("base64")}`;
  } catch (error: any) {
    throw error;
  }
}
