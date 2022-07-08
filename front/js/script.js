var requestOption = {
  method: 'GET',
};

fetch('http://localhost:3000/api/products/', requestOption)
  .then((res) => res.json())
  .then((result) =>
    result.forEach((productApi) => {
      createArticle(productApi);
    })
  );

function createArticle(product) {
  const items = document.getElementById('items');

  const a = document.createElement('a');
  a.href = './product.html?id=' + product._id;

  const article = document.createElement('article');

  const img = document.createElement('img');
  img.src = product.imageUrl;
  img.alt = product.altTxt;

  const h3 = document.createElement('h3');
  h3.className = 'productName';
  h3.textContent = product.name;

  const p = document.createElement('p');
  p.className = 'productDescription';
  p.textContent = product.description;

  items.appendChild(a);
  a.appendChild(article);
  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);
  console.log(a);
}
