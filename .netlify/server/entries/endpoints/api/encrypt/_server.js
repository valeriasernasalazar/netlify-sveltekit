import { j as json } from "../../../../chunks/index.js";
const POST = async ({ request }) => {
  const data = await request.json();
  const response = await fetch("http://127.0.0.1:5000/api/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return json(result);
};
export {
  POST
};
