const dal = require("../data-access-layer/dal");

async function getAllProductsAsync() {
    const sql = "SELECT ProductID as id, ProductName as name, UnitPrice as price, UnitsInStock as stock FROM products";
    const products = await dal.executeAsync(sql);
    return products;
}

async function getOneProductAsync(id) {
    const sql = `
        SELECT ProductID as id,
            ProductName as name,
            UnitPrice as price,
            UnitsInStock as stock
        FROM products
        WHERE ProductID = ${id}`;

    const products = await dal.executeAsync(sql);
    return products[0];
}

async function addProductAsync(product) {
    const sql = `
        INSERT INTO products(productName, unitPrice, unitsInStock)
        VALUES('${product.name}',${product.price},${product.stock})`;
    const info = await dal.executeAsync(sql); // זהו אובייקט המכיל מידע לגבי ההוספה שהתבצעה info
    product.id = info.insertId; // הקוד החדש שמסד הנתונים יצר
    return product;
}

async function updateFullProductAsync(product) {
    const sql = `
        UPDATE + SET
            ProductName = '${product.name}',
            UnitPrice = ${product.price},
            UnitsInStock = ${product.stock}
        WHERE ProductID = ${product.id}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : product;
}


async function updatePartialProductAsync(product) {

    let sql = "UPDATE Products SET ";

    if(product.name) {
        sql += `ProductName = '${product.name}',`
    }
    if(product.price) {
        sql += `UnitPrice = ${product.price},`
    }
    if(product.stock) {
        sql += `UnitsInStock = ${product.stock},`
    }

    // Delete last comma: 
    sql = sql.substr(0, sql.length - 1);

    sql += ` WHERE ProductID = ${product.id}`;

    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : product;
}

async function deleteProductAsync(id) {
    const sql = `DELETE FROM Products WHERE ProductID = ${id}`;
    await dal.executeAsync(sql);
}

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    addProductAsync,
    updateFullProductAsync,
    updatePartialProductAsync,
    deleteProductAsync
};