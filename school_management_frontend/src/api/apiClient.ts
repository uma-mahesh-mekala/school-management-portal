import authStorage from "../features/auth/utils/authStorage";

const apiFetch = async (url: string, options: RequestInit = {}) => {
  console.log("I am here");
  const accessToken = authStorage.getAccessToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response;
};

export { apiFetch };
