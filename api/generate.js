export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64 } = req.body;

  try {
    // ENDPOINT ESTÁVEL: Utilitário oficial de remoção de fundo da Fal.ai
    const response = await fetch("https://fal.run/fal-ai/imageutils/rembg", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_url: imageBase64
      })
    });

    const data = await response.json();

    // Acessando o retorno padrão deste utilitário
    const finalUrl = data.image?.url || data.url;

    if (finalUrl) {
      res.status(200).json({ url: finalUrl });
    } else {
      console.error("Resposta inesperada da API de Recorte:", data);
      res.status(500).json({ error: 'Falha na IA de recorte' });
    }

  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: 'Erro de comunicação' });
  }
}