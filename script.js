// Replace with your full CA (not shortened) if you want real copy.
const FULL_CA = "0x111690000000000000000000000000005073744";

const caValue = document.getElementById("caValue");
const copyBtn = document.getElementById("copyBtn");

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(FULL_CA);
    copyBtn.textContent = "✓";
    setTimeout(() => (copyBtn.textContent = "⧉"), 900);
  } catch (e) {
    alert("Copy failed. Please copy manually.");
  }
});
