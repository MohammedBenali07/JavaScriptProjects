const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const btnDelete = document.getElementById('btnDelete');

let mood = 'create'; 
let tmp; 
let searchMood = 'title'; 

function getTotal() {
  if (price.value !== '') {
    const result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.textContent = result.toFixed(2);
    total.style.backgroundColor = '#040';
  } else {
    total.textContent = '';
    total.style.backgroundColor = 'rgb(138, 10, 10)';
  }
}

let dataProduct = JSON.parse(localStorage.getItem('product')) || [];

submit.onclick = function () {
  const newProduct = {
    title: title.value.trim().toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.textContent,
    count: count.value,
    category: category.value.trim().toLowerCase(),
  };

  if (mood === 'create') {
    if (newProduct.count > 0) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
  } else {
    dataProduct[tmp] = {
      ...newProduct,
      count: 1,
    };
    mood = 'create';
    submit.textContent = 'Create';
    count.style.display = 'block';
  }

  localStorage.setItem('product', JSON.stringify(dataProduct));

  clearData();
  showData();
};

function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.textContent = '';
  count.value = '';
  category.value = '';
}

function showData() {
  getTotal();
  let table = '';

  dataProduct.forEach((product, index) => {
    table += `
      <tr>
        <td>${index + 1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick='updateData(${index})'>Update</button></td>
        <td><button onclick='deleteData(${index})'>Delete</button></td>
      </tr>
    `;
  });

  tbody.innerHTML = table;

  btnDelete.innerHTML = dataProduct.length
    ? `<button onclick='deleteAll()'>Delete All</button>`
    : '';
}

function deleteData(index) {
  dataProduct.splice(index, 1);
  localStorage.setItem('product', JSON.stringify(dataProduct));
  showData();
}

function deleteAll() {
  dataProduct = [];
  localStorage.removeItem('product');
  showData();
}

function updateData(index) {
  const product = dataProduct[index];
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  category.value = product.category;

  getTotal(); 

  count.style.display = 'none'; 
  submit.textContent = 'Update'; 
  mood = 'update'; 
  tmp = index; 

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getSearchMood(id) {
  const search = document.getElementById('search');
  searchMood = id === 'searchTitle' ? 'title' : 'category';
  search.placeholder = `Search by ${searchMood}`;
  search.focus();
  search.value = '';
  showData();
}

function searchData(value) {
  const lowerValue = value.toLowerCase();
  const filteredProducts = dataProduct.filter((product) =>
    product[searchMood].includes(lowerValue)
  );

  let table = '';

  filteredProducts.forEach((product, index) => {
    table += `
      <tr>
        <td>${index + 1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick='updateData(${index})'>Update</button></td>
        <td><button onclick='deleteData(${index})'>Delete</button></td>
      </tr>
    `;
  });

  tbody.innerHTML = table;
}

showData();
