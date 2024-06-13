export default async function makePostPutRequest(
  apiEndpoint: string,
  method: "POST" | "PUT",
  body: Record<string, any>,
  validationCallback: () => boolean,
) {
  try {
    if (!validationCallback())
      return { error: true, errorMessage: "Invalid body bad request." };

    const requestResponse = await fetch(apiEndpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await requestResponse.json();
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  }
}
