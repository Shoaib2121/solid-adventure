// This is a Vercel Serverless Function for proxying NetSuite API requests
// Place this file in /api/netsuite.js in your project root (not src)

export default async function handler(req, res) {
  const url =
    "https://td3032620.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=99&deploy=1&compid=TD3032620&ns-at=AAEJ7tMQZ7cccAU6W7MOeCTu5No9Jszw0CV_6cNhzByn8MXjXaU";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Add any required headers here
      },
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
