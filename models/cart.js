const fs = require('fs')
const path = require('path')

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'cart.json'
)

module.exports = class Cart
{
	static addProduct(id, productPrice)
	{
		// Fetch previous cart
		fs.readFile(p, (err, fileContent) => 
		{
			let cart = {products: [], totalPrice: 0}
			if (!err)
			{
				// If got error, meaning we don't have an existing cart yet. So we need to create one
				cart = JSON.parse(fileContent)
			}
			// Analyze the product (find if already existing)
			const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			// Add it to an array or just increase the quantity
			if (existingProduct)
			{
				updatedProduct = {...existingProduct}
				updatedProduct.qty = updatedProduct.qty + 1
				cart.products = [...cart.products]
				cart.products[existingProductIndex] = updatedProduct
			}
			else
			{
				updatedProduct = {id: id, qty: 1}
				cart.products = [...cart.products, updatedProduct]
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) =>
			{
				console.log(err)
			})
		})
	}

	// Identify item to be deleted using id
	// Need to also update the price
	static deleteProduct(id, productPrice)
	{
		fs.readFile(p, (err, fileContent) =>
		{
			if (err)
			{
				return
			}
			const updatedCart = {...JSON.parse(fileContent)}
			const product = updatedCart.products.find(prod => prod.id === id)
			if (!product)
				return ;
			const productQty = product.qty
			updatedCart.products = updatedCart.products.filter(prod=> prod.id === id)
			updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty// We need to find out how many numbers of the same item is in the product
			fs.writeFile(p, JSON.stringify(updatedCart), (err) =>
			{
				console.log(err)
			})
		})
	}
}