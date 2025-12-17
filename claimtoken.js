const fromAmount = document.getElementById("fromAmount");
const toAmount = document.getElementById("toAmount");
const swapBtn = document.getElementById("swapBtn");
const maxBtn = document.getElementById("maxBtn");
const connectBtn = document.getElementById("connectBtn");
const bridgeBtn = document.getElementById("bridgeBtn");
const feeEl = document.getElementById("fee");

function updateEstimate(){
  const val = parseFloat(fromAmount.value || "0");
  if (!isFinite(val)) return;
  // simple placeholder estimate
  toAmount.value = val ? (val * 0.995).toFixed(4) : "";
  feeEl.textContent = val ? "~0.5%" : "~0.00";
}

fromAmount.addEventListener("input", updateEstimate);

maxBtn.addEventListener("click", () => {
  fromAmount.value = "1.0";
  updateEstimate();
});

swapBtn.addEventListener("click", () => {
  // UI only: just swap placeholder values
  const a = fromAmount.value;
  fromAmount.value = "";
  toAmount.value = a;
  updateEstimate();
});

connectBtn.addEventListener("click", () => {
  alert("Connect Wallet (UI only). Hook wagmi/ethers here.");
});

bridgeBtn.addEventListener("click", () => {
  alert("Claim/Bridge clicked (UI only). Hook your contract/bridge logic here.");
});
