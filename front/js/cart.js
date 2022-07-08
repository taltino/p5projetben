function createElementHtml(product, color, quantity) {
    
}

const main = async () => {
  const localStorage = window.localStorage;
  const key = 'products';
  let products = JSON.parse(localStorage.getItem(key));

  for (const product of products) {
    var requestOption = {
      method: 'GET',
    };

    await fetch(
      'http://localhost:3000/api/products/' + product.id,
      requestOption
    )
      .then((res) => res.json())
      .then((product) => {
        createElementHtml(product, product.color, product.quantity);
      });
  }
};
