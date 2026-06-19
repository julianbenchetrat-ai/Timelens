export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const response = await fetch(
            "https://api-inference.huggingface.co/models/Qwen/Qwen-Image-Edit",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/octet-stream"
                },
                body: req.body
            }
        );

        if (!response.ok) {

            const text = await response.text();

            return res.status(response.status).json({
                error: text
            });

        }

        const buffer = await response.arrayBuffer();

        res.setHeader("Content-Type", "image/png");

        return res.send(Buffer.from(buffer));

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

}
