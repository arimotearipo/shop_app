const fs = require('fs')
const path = require('path');
const { createBrotliCompress } = require('zlib');
const rootDir = require('../util/path')

const p = path.join(
	rootDir,
	'data',
	'products.json'
)

const getProductsFromFile = (cb) =>
{
	fs.readFile(p, (err, fileContent) => {
		if (err)
		{
			cb([]);
		}
		else
		{
			cb(JSON.parse(fileContent))
		}
		cb(JSON.parse(fileContent))
	})
}

module.exports = class Product
{
	constructor(title, imageUrl, description, price)
	{
		this.title = title;
		this.imageUrl = imageUrl
		this.description = description
		this.price = price
	}

	save()
	{
		this.id = Math.random().toString();
		getProductsFromFile(products => {
			products.push(this)
			fs.writeFile(p, JSON.stringify(products), err => {
				console.log(err);
			});
		})
		fs.readFile(p, (err, fileContent) => {})
	}

	static fetchAll(cb)
	{	
		getProductsFromFile(cb)
	}
}