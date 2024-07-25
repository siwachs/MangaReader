import sharp from "sharp";

import path from "path";
import fs from "fs/promises";

export async function getBlurDataURL(imageUrl: string) {
  const localImagePath = path.join(
    __dirname,
    `../../../../../../../public/${imageUrl}`,
  );

  try {
    await fs.access(localImagePath);

    const imageBuffer = await sharp(localImagePath)
      .resize(10)
      .blur(5)
      .toFormat("webp")
      .toBuffer();

    return `data:image/webp;base64,${imageBuffer.toString("base64")}`;
  } catch (error: any) {
    console.log(error.message);
  }
}

// TODO Create a function to get a Base 64 Image
