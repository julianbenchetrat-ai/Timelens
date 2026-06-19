export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Use POST only" });
    }

    try {

        // TEMP fake AI (just returns random image)
        const imageUrl = "https://picsum.photos/400/400?random=" + Date.now();

        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();

        res.setHeader("Content-Type", "image/png");
        res.send(Buffer.from(buffer));

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}
