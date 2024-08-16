function isBase64Image(data: string): boolean {
  const base64Regex = /^data:image\/[^;]+;base64,/;
  return base64Regex.test(data);
}

function isValidHttpURL(urlString: string): boolean {
  try {
    const url = new URL(urlString);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

export { isBase64Image, isValidHttpURL };
