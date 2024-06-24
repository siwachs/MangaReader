export async function makeGetRequest(
  apiEndpoint: string,
  queryParams: string,
  callback: () => void,
) {
  try {
    const requestResponse = await fetch(`${apiEndpoint}?${queryParams}`);
    return await requestResponse.json();
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  } finally {
    callback();
  }
}

export async function makePostPutRequest(
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

export async function makeDeleteRequest(
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
