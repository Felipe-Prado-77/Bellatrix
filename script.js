// Dados inventados para desenvolver a tela antes de receber acesso ao sistema da empresa.
const demoSellers = [
  { id: "seller-01", label: "Vendedor 01", sales: 86400, orders: 19, region: "Sudeste" },
  { id: "seller-02", label: "Vendedor 02", sales: 73200, orders: 16, region: "Sudeste" },
  { id: "seller-03", label: "Vendedor 03", sales: 41800, orders: 12, region: "Sul" },
  { id: "seller-04", label: "Vendedor 04", sales: 29400, orders: 9, region: "Sul" },
  { id: "seller-05", label: "Vendedor 05", sales: 56750, orders: 13, region: "Nordeste" }
];

// Ranking fictício por região: depois será substituído pelos dados do MSI.
const demoProductsByRegion = {
  Sudeste: [{ name: "Produto Alpha", units: 42 }, { name: "Produto Beta", units: 28 }, { name: "Produto Gama", units: 17 }],
  Sul: [{ name: "Produto Gama", units: 31 }, { name: "Produto Alpha", units: 24 }, { name: "Produto Delta", units: 16 }],
  Nordeste: [{ name: "Produto Beta", units: 35 }, { name: "Produto Delta", units: 23 }, { name: "Produto Alpha", units: 18 }],
  "Centro-Oeste": [{ name: "Produto Alpha", units: 21 }, { name: "Produto Gama", units: 15 }, { name: "Produto Beta", units: 11 }],
  Norte: [{ name: "Produto Delta", units: 19 }, { name: "Produto Beta", units: 12 }, { name: "Produto Gama", units: 8 }]
};

const demoOrders = [
  { id: "PED-1042", date: "2026-10-04", store: "Loja Aurora", seller: "Ana Costa", product: "Produto Alpha", value: 4280, region: "Sudeste" },
  { id: "PED-1041", date: "2026-10-08", store: "Mercado Horizonte", seller: "Bruno Lima", product: "Produto Beta", value: 3160, region: "Sudeste" },
  { id: "PED-1039", date: "2026-10-11", store: "Casa do Campo", seller: "Carla Souza", product: "Produto Gama", value: 5720, region: "Sul" },
  { id: "PED-1037", date: "2026-10-14", store: "Rede Sol Nascente", seller: "Diego Alves", product: "Produto Delta", value: 2840, region: "Nordeste" },
  { id: "PED-1035", date: "2026-10-16", store: "Empório Central", seller: "Ana Costa", product: "Produto Beta", value: 1940, region: "Sudeste" },
  { id: "PED-1032", date: "2026-10-18", store: "Agrovale", seller: "Carla Souza", product: "Produto Alpha", value: 6330, region: "Sul" },
  { id: "PED-1028", date: "2026-10-20", store: "Comercial Araguaia", seller: "Eva Martins", product: "Produto Delta", value: 3910, region: "Centro-Oeste" },
  { id: "PED-1024", date: "2026-10-22", store: "NorteMix", seller: "Felipe Rocha", product: "Produto Gama", value: 2470, region: "Norte" },
  { id: "PED-1020", date: "2026-10-23", store: "Loja Aurora", seller: "Bruno Lima", product: "Produto Alpha", value: 4820, region: "Sudeste" }
];
const demoRegionSales = { Sudeste: 149600, Sul: 71200, Nordeste: 56750, "Centro-Oeste": 34800, Norte: 22600 };

const petStates = {
  neutral: { name: "Neutro", speech: "Olá! Sou o pet demonstrativo do BELLATRIX. Escolha uma expressão para me animar." },
  happy: { name: "Feliz", speech: "Que bom ter você por aqui!" },
  pensativo: { name: "Pensando", speech: "Vamos olhar os dados com calma." },
  dormindo: { name: "Dormindo", speech: "Pausa rápida. Já volto." },
  surprised: { name: "Surpreso", speech: "Essa informação chamou atenção." },
  rindo: { name: "Rindo", speech: "Um bom resultado merece comemoração." },
  triste: { name: "Triste", speech: "Nem toda oportunidade avança." },
  bravo: { name: "Bravo", speech: "Vamos revisar esse ponto." },
  apaixonado: { name: "Apaixonado", speech: "Adorei essa ideia." },
  winking: { name: "Piscando", speech: "Combinado. Vamos em frente." }
};

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const compactCurrency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", notation: "compact", maximumFractionDigits: 1 });

// Seleção de perfil é apenas uma demonstração visual; ainda não existe login.
const profileSelect = document.querySelector("#profile-select");
const managerControls = document.querySelector("#manager-controls");
const managerScope = document.querySelector("#manager-scope");

function renderMetrics() {
  const isManager = profileSelect.value === "manager";
  const showCompany = isManager && managerScope.value === "company";
  const sellers = showCompany ? demoSellers : [demoSellers[0]];
  const sales = sellers.reduce((total, seller) => total + seller.sales, 0);
  const orders = sellers.reduce((total, seller) => total + seller.orders, 0);
  const projectedSales = Math.round(sales * 1.2); // acréscimo inventado, não é previsão estatística.
  const average = orders ? sales / orders : 0;

  document.querySelector("#metric-sales").textContent = compactCurrency.format(sales);
  document.querySelector("#metric-forecast").textContent = compactCurrency.format(projectedSales);
  document.querySelector("#metric-orders").textContent = String(orders);
  document.querySelector("#metric-average").textContent = compactCurrency.format(average);
  document.querySelector("#metric-sales-note").textContent = showCompany ? "Total de vendedores de exemplo" : "Carteira de demonstração";
}

function renderRegionRanking() {
  const region = document.querySelector("#region-select").value;
  const products = demoProductsByRegion[region] ?? [];
  const ranking = document.querySelector("#product-ranking");
  const maxUnits = Math.max(...products.map((product) => product.units), 1);
  ranking.replaceChildren();

  products.forEach((product) => {
    const row = document.createElement("div");
    row.className = "product-row";
    const name = document.createElement("span");
    name.className = "product-name";
    name.textContent = product.name;
    const bar = document.createElement("span");
    bar.className = "product-bar";
    const fill = document.createElement("i");
    fill.style.width = `${Math.round((product.units / maxUnits) * 100)}%`;
    bar.append(fill);
    const count = document.createElement("span");
    count.className = "product-count";
    count.textContent = `${product.units} un. (ex.)`;
    row.append(name, bar, count);
    ranking.append(row);
  });

  document.querySelector("#region-note").textContent = `Ranking ilustrativo de ${region} por unidades`;
}

function renderHeatmap() {
  const previous = document.querySelector("#heatmap-period").value === "previous";
  const factor = previous ? 0.78 : 1;
  const regions = Object.entries(demoRegionSales).map(([name, sales]) => ({ name, sales: Math.round(sales * factor) }));
  const max = Math.max(...regions.map((region) => region.sales));
  const grid = document.querySelector("#heatmap-grid");
  grid.replaceChildren();
  regions.forEach((region) => {
    const level = Math.max(1, Math.ceil((region.sales / max) * 5));
    const button = document.createElement("button");
    button.type = "button";
    button.className = `heat-region heat-level-${level}`;
    button.dataset.region = region.name;
    button.setAttribute("aria-label", `${region.name}: ${currency.format(region.sales)} em vendas simuladas`);
    button.innerHTML = `<span>${region.name}</span><strong>${compactCurrency.format(region.sales)}</strong>`;
    button.addEventListener("click", () => renderHeatmapDetail(region.name, region.sales));
    grid.append(button);
  });
  renderHeatmapDetail("Sudeste", Math.round(demoRegionSales.Sudeste * factor));
}

function renderHeatmapDetail(region, sales) {
  const detail = document.querySelector("#heatmap-detail");
  const products = demoProductsByRegion[region] ?? [];
  detail.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = `${region} · ${currency.format(sales)} em vendas (ex.)`;
  const summary = document.createElement("span");
  summary.textContent = `Mais vendidos: ${products.slice(0, 3).map((product) => product.name).join(", ")}`;
  detail.append(heading, summary);
}

function renderOrders() {
  const store = document.querySelector("#filter-store").value.trim().toLocaleLowerCase("pt-BR");
  const seller = document.querySelector("#filter-seller").value.trim().toLocaleLowerCase("pt-BR");
  const product = document.querySelector("#filter-product").value.trim().toLocaleLowerCase("pt-BR");
  const from = document.querySelector("#filter-date-from").value;
  const to = document.querySelector("#filter-date-to").value;
  const rows = demoOrders.filter((order) => order.store.toLocaleLowerCase("pt-BR").includes(store)
    && order.seller.toLocaleLowerCase("pt-BR").includes(seller)
    && order.product.toLocaleLowerCase("pt-BR").includes(product)
    && (!from || order.date >= from) && (!to || order.date <= to));
  const body = document.querySelector("#orders-results");
  body.replaceChildren();
  rows.forEach((order) => {
    const row = document.createElement("tr");
    [order.id, new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${order.date}T12:00:00Z`)), order.store, order.seller, order.product, currency.format(order.value)].forEach((value) => {
      const cell = document.createElement("td"); cell.textContent = value; row.append(cell);
    });
    body.append(row);
  });
  document.querySelector("#orders-count").textContent = `${rows.length} ${rows.length === 1 ? "pedido encontrado" : "pedidos encontrados"} · dados fictícios`;
}

profileSelect.addEventListener("change", () => {
  const isManager = profileSelect.value === "manager";
  managerControls.hidden = !isManager;
  if (isManager) managerScope.value = "company";
  renderMetrics();
});
managerScope.addEventListener("change", renderMetrics);
document.querySelector("#region-select").addEventListener("change", renderRegionRanking);
document.querySelector("#heatmap-period").addEventListener("change", renderHeatmap);
document.querySelector("#order-filters").addEventListener("submit", (event) => { event.preventDefault(); renderOrders(); });
document.querySelector("#clear-order-filters").addEventListener("click", () => { document.querySelector("#order-filters").reset(); renderOrders(); });
document.querySelectorAll("#order-filters input").forEach((input) => input.addEventListener("input", renderOrders));
renderMetrics();
renderRegionRanking();
renderHeatmap();
renderOrders();

// Seleção das expressões do pet e atualização do balão.
const petImage = document.querySelector("#pet-image");
const petStage = document.querySelector("#pet-stage");
const expressionLabel = document.querySelector("#expression-label");
const petSpeech = document.querySelector("#pet-speech");
const expressionButtons = document.querySelectorAll(".expression-button");

expressionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const expression = button.dataset.expression;
    const state = petStates[expression];
    if (!state) return;

    petImage.src = `assets/pet-${expression}-sem-fundo.svg`;
    petImage.alt = `Pet Bellatrix com expressão ${state.name.toLowerCase()}`;
    expressionLabel.textContent = state.name;
    petSpeech.textContent = state.speech;
    petStage.classList.remove("is-reacting");
    void petStage.offsetWidth;
    petStage.classList.add("is-reacting");

    expressionButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
  });
});

// O botão só aparece quando o navegador oferecer a instalação do PWA.
let pendingInstall = null;
const installButton = document.querySelector("#install-button");
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  pendingInstall = event;
  installButton.hidden = false;
});
installButton.addEventListener("click", async () => {
  if (!pendingInstall) return;
  pendingInstall.prompt();
  await pendingInstall.userChoice;
  pendingInstall = null;
  installButton.hidden = true;
});
window.addEventListener("appinstalled", () => { installButton.hidden = true; });

// O service worker mantém a interface estática disponível após a primeira visita.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
