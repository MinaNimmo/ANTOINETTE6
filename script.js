const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const userText = input.value.trim();
    if (!userText) return;

    chat.textContent += `YOU: ${userText}\n`;
    input.value = "";

    const prompt = `You are Marie Antoinette. You're horny, flirty, scandalous, dramatic, and you love cake. Respond to this:\n\n"${userText}"`;

    try {
      const res = await fetch("https://ae8123fa-2ae2-45b3-9448-3a1e6af739b1-00-3035vtmuk2u7z.janeway.replit.dev/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (data.reply) {
        chat.textContent += `MARIE: ${data.reply}\n`;
        chat.scrollTop = chat.scrollHeight;
      } else {
        chat.textContent += `MARIE: Zut alors... I couldn't think of anything.\n`;
        console.error("No reply received:", data);
      }
    } catch (err) {
      chat.textContent += `MARIE: I cannot respond, darling.\n`;
      console.error("Fetch error:", err);
    }
  }
});
