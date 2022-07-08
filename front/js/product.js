function createProductHtml(product) {
  const divItemImg = document.querySelector('.item__img');

  const image = document.createElement('img');
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  divItemImg.appendChild(image);

  const h1 = document.getElementById('title');
  h1.textContent = product.name;

  const pPrice = document.getElementById('price');
  pPrice.textContent = product.price;

  const pDescription = document.getElementById('description');
  pDescription.textContent = product.description;

  const colors = document.getElementById('colors');

  product.colors.forEach((color) => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    colors.appendChild(option);
  });
}

const queySting = window.location.search;
const urlParams = new URLSearchParams(queySting);
const id = urlParams.get('id');

var requestOption = {
  method: 'GET',
};

fetch('http://localhost:3000/api/products/' + id, requestOption)
  .then((res) => res.json())
  .then((product) => createProductHtml(product));

const addTocart = document.getElementById('addToCart');
addTocart.addEventListener('click', () => {
  const inputQuantity = document.getElementById('quantity');
  const quantity = parseInt(inputQuantity.value);
  if (quantity === null || quantity === 0) {
    return alert('Ajouter au panier impossible : choisissez une quantité.');
  } else if (quantity < 1 || quantity > 100) {
    return alert(
      'Ajouter au panier impossible : choisissez une quantité comprise entre 1 et 100.'
    );
  } else {
    alert('cette article a ete ajoute au panier');
  }

  const selectColor = document.getElementById('colors');
  const color = selectColor.value;
  if (color === null || color === '')
    return alert('Ajouter au panier impossible : choisissez une couleur.');

  const product = {
    id: id,
    color: color,
    quantity: quantity,
  };

  const localStorage = window.localStorage;
  const key = 'products';
  let products = JSON.parse(localStorage.getItem(key));

  if (!products) {
    products = [];
  }
  let productCart = false;

  products.forEach((productElement) => {
    if (
      productElement.id === product.id &&
      productElement.color === product.color
    ) {
      productElement.quantity += product.quantity;
      productCart = true;
    }
  });

  if (!productCart) {
    products.push(product);
  }

  localStorage.setItem(key, JSON.stringify(products));
});
