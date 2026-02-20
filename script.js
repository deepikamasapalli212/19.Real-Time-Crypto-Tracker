const container = document.getElementById("cryptoContainer");

/* Create Modal */
const modal = document.createElement("div");
modal.id = "coinModal";
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0,0,0,0.8)";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.style.color = "white";
modal.style.padding = "20px";
modal.innerHTML = `<div id="modalContent" style="
background:#1e1e1e;
padding:25px;
border-radius:15px;
max-width:400px;
width:100%;
position:relative;
">
<button onclick="closeModal()" style="
position:absolute;
top:10px;
right:10px;
background:red;
color:white;
border:none;
padding:5px 10px;
border-radius:6px;
cursor:pointer;
">X</button>
<div id="coinDetails"></div>
</div>`;

document.body.appendChild(modal);

async function fetchCrypto(){

try{
const response = await fetch(
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false"
);

const data = await response.json();

container.innerHTML="";

data.forEach(coin=>{

const changeClass = coin.price_change_percentage_24h >= 0 ? "green" : "red";

const card = document.createElement("div");
card.className="crypto-card";
card.style.cursor="pointer";

card.innerHTML=`
<img src="${coin.image}">
<h3>${coin.name}</h3>
<p class="price">$${coin.current_price}</p>
<p class="${changeClass}">
24h: ${coin.price_change_percentage_24h.toFixed(2)}%
</p>
`;

card.onclick = ()=>{
openModal(coin);
};

container.appendChild(card);
});

}catch(error){
container.innerHTML="<p>Error loading data</p>";
}
}

function openModal(coin){
document.getElementById("coinDetails").innerHTML = `
<h2>${coin.name}</h2>
<p><strong>Price:</strong> $${coin.current_price}</p>
<p><strong>Market Cap:</strong> $${coin.market_cap.toLocaleString()}</p>
<p><strong>24h Volume:</strong> $${coin.total_volume.toLocaleString()}</p>
<p><strong>24h Change:</strong> ${coin.price_change_percentage_24h.toFixed(2)}%</p>
`;
modal.style.display="flex";
}

function closeModal(){
modal.style.display="none";
}

/* Initial Load */
fetchCrypto();

/* Refresh every 30 seconds */
setInterval(fetchCrypto,30000);
