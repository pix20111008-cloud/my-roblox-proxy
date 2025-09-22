import fetch from "node-fetch";

export default async function handler(req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).send("IDを指定してください");

  const robloxUrl = `https://www.roblox.com/asset/?id=${id}`;
  
  try {
    const response = await fetch(robloxUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // CORS対応
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Failed to fetch sound");
  }
}
