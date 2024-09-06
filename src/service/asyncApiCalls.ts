export async function makeGetRequest(
  apiEndpoint: string,
  queryParams?: string,
  callback?: () => void,
) {
  try {
    const requestResponse = await fetch(
      queryParams ? `${apiEndpoint}?${queryParams}` : apiEndpoint,
    );
    return await requestResponse.json();
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  } finally {
    if (callback) callback();
  }
}

export async function makePostPutRequest(
  apiEndpoint: string,
  method: "POST" | "PUT",
  body: Record<string, any>,
  callback?: () => void,
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
  } finally {
    if (callback) callback();
  }
}

export async function makeDeleteRequest(
  apiEndpoint: string,
  headers: Record<string, any>,
  callback?: () => void,
) {
  try {
    const requestResponse = await fetch(apiEndpoint, {
      method: "DELETE",
      headers,
    });
    return await requestResponse.json();
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  } finally {
    if (callback) callback();
  }
}
