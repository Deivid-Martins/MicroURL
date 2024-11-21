document.getElementById("linkForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalUrlInput = document.getElementById("originalUrl");
    let originalUrl = originalUrlInput.value.trim();

    // Verifica se a URL não começa com http:// ou https:// e adiciona https://
    if (originalUrl && !originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
        originalUrl = 'https://' + originalUrl; // Corrige a URL
        originalUrlInput.value = originalUrl;
    }

    document.getElementById("button").textContent = "Wait a bit...";

    // Calculando a data de expiração (14 dias depois)
    const currentDate = new Date();
    const expirationDateInMilliseconds = currentDate.getTime() + 14 * 24 * 60 * 60 * 1000;
    const expirationTimestampInSeconds = Math.floor(expirationDateInMilliseconds / 1000);

    try {
        const response = await fetch("https://zp2zegwi15.execute-api.sa-east-1.amazonaws.com/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                originalUrl: originalUrl,
                expirationTime: expirationTimestampInSeconds.toString(),
            }),
        });

        // Processa a resposta do servidor
        const result = await response.json();
        document.getElementById("result").textContent = `https://zp2zegwi15.execute-api.sa-east-1.amazonaws.com/${result.code}`;
        document.getElementById("button").textContent = "Submit"; // Restaura o texto do botão
    } catch (error) {
        console.error("Erro ao encurtar link:", error);
    }
});
