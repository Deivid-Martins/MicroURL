document.getElementById("linkForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalUrl = document.getElementById("originalUrl").value;
    document.getElementById("button").textContent = "Wait a bit...";

    const currentDate = new Date();
    const expirationDateInMilliseconds = currentDate.getTime() + 14 * 24 * 60 * 60 * 1000;
    //Expira 14 dias após a criação
    const expirationTimestampInSeconds = Math.floor(expirationDateInMilliseconds / 1000);

    try {
        const response = await fetch(URL_API + "/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                originalUrl: originalUrl, 
                expirationTime: expirationTimestampInSeconds.toString(),
            }),
        });

        const result = await response.json();
        document.getElementById("result").textContent = `${URL_API}/${result.code}`;
        document.getElementById("button").textContent = "Submit";
    } catch (error) {
        console.error("Erro ao encurtar link:", error);
    }
});
