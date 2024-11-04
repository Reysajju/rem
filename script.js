document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/.netlify/functions/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        document.getElementById("status").textContent = result.message;
    } catch (error) {
        document.getElementById("status").textContent = "Error sending message.";
    }
});
