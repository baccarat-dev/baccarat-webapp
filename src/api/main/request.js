exports.request = async function request(url = "", method = "GET", body = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method !== "GET" ? JSON.stringify(body) : null,
  });
  return response.json();
};
