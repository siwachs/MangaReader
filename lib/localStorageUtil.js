export const setData = (content_id, expiresInHours) => {
  if (!content_id) return;
  const expiresInMs = expiresInHours * 60 * 60 * 1000;
  const expirationTime = new Date().getTime() + expiresInMs;
  const key = `viewed_${content_id}`;

  localStorage.setItem(key, expirationTime);
};

export const getData = (content_id) => {
  const key = `viewed_${content_id}`;
  const expirationTime = localStorage.getItem(key);
  if (!expirationTime) return null;

  const currentTime = new Date().getTime();
  if (currentTime < expirationTime) {
    return expirationTime;
  }

  return null;
};
