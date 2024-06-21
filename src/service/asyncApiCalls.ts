async function makePostPutRequest(
  apiEndpoint: string,
  method: "POST" | "PUT",
  body: Record<string, any>,
) {
  try {
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

async function makeDeleteRequest(
  apiEndpoint: string,
  method: "DELETE",
  headers: Record<string, any>,
) {
  try {
    const requestResponse = await fetch(apiEndpoint, {
      method,
      headers,
    });
    return await requestResponse.json();
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  }
}

export { makePostPutRequest, makeDeleteRequest };
