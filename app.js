$(document).ready(onReady);

const shoppingCart = [];
const wallet = 1000;

function onReady() {
  $('#js-form-addProduct').on('submit', addProduct);
  $('#js-table-body').on('click', '.js-btn-delete', deleteRow);

  render();
}

function addProduct(event) {
  event.preventDefault();

  const product = {
    name: $('#js-input-name').val(),
    sku: $('#js-input-sku').val(),
    price: $('#js-input-price').val(),
  };

  product.price = parseFloat(product.price);

  $('#js-input-name').val('');
  $('#js-input-sku').val('');
  $('#js-input-price').val('');

  shoppingCart.push(product);
  console.table(shoppingCart);
  render();
}

function deleteRow() {
  //   console.log('meow');
  $(this).parent().parent().fadeOut();
}

function render() {
  $('#js-table-body').empty();

  let total = 0;

  for (let product of shoppingCart) {
    total += product.price;

    $('#js-table-body').append(`
        <tr>
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>${product.price}</td>
            <td><button class="js-btn-delete btn btn-danger">X</button></td>
        </tr>
    `);
  }

  if (total > wallet) {
    $('#js-total').addClass('redText');
  } else {
    $('#js-total').removeClass('redText');
  }

  $('#js-total').text(`Total Cost: $${total.toFixed(2)}`);
}
