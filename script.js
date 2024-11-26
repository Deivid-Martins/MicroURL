const UrlApi = "api.exemploDeUrlDaApi.org";

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
        const response = await fetch(`${UrlApi}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                originalUrl: originalUrl,
                expirationTime: expirationTimestampInSeconds.toString(),
            }),
        });

        // Processa a resposta do servidor
        const result = await response.json();
        document.getElementById("result").innerHTML = `<a href="${UrlApi}/${result.code}" target="_blank">https://api.exemploDeUrlDaApi.org/${result.code}</a>`;
        document.getElementById("result").style.backgroundColor = "#728897";
        document.getElementById("result").style.borderRadius = "4px";
        document.getElementById("result").style.padding = "10px";

        document.getElementById("button").textContent = "Submit"; // Restaura o texto do botão
    } catch (error) {
        console.error("Erro ao encurtar link:", error);
    }
});
