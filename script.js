const catList = document.querySelector(".category-list");
const productList = document.querySelector(".product-list");
const modal = document.querySelector(".modal-wrapper");
const sepetBtn = document.querySelector("#sepet");
const closedBtn = document.querySelector("#close");
const modalList = document.getElementById("modalList");
const totalFiyat=document.querySelector("#fiyat")
document.addEventListener("DOMContentLoaded", () => {
  fetchCategorys();
  fetchProduct();
});

function fetchCategorys() {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 4).forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = ` 
    <img src=${category.image} alt="">
    <span>${category.name}</span>
    `;
        catList.appendChild(categoryDiv);
      })
    )
    .catch((err) => console.log(err));
}

function fetchProduct() {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 25).forEach((item) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <img src=${item.images[0]} alt="">
        <p>${item.title}</p>
        <p>${item.category.name}</p>
        <div class="product-info">
            <span>${item.price} TL</span>
            <button onclick="sepetEkle({name:'${item.title}',id:'${item.id}',price:'${item.price}',amount:1})">Sepete Ekle</button>
        </div>
        `;
        productList.appendChild(productDiv);
      })
    )

    .catch((err) => console.log(err));
}
const basket = [];
let toplamFiyat=0

function ListBasket() {
  basket.forEach((eleman) => {
    const basketItem = document.createElement("div");
    basketItem.classList.add("sepetItem");
    basketItem.innerHTML = `
            <h2>${eleman.name}</h2>
            <h2>${eleman.price} $</h2>
            <p>Miktar:${eleman.amount}</p>
        `
    modalList.appendChild(basketItem)
    toplamFiyat+=Number(eleman.price)*eleman.amount
    
  });
  totalFiyat.innerText=toplamFiyat
}

sepetBtn.addEventListener("click", () => {
  toggleSepet(), ListBasket();
});
closedBtn.addEventListener("click", ()=>{
    toggleSepet()
    modalList.innerHTML=""
});

function toggleSepet() {
  modal.classList.toggle("active");
}

function sepetEkle(param) {
  const foundİtem = basket.find((i) => i.id === param.id);

  if (foundİtem) {
    foundİtem.amount += 1;
  } else {
    basket.push(param);
  }
  console.log(basket);
}

