const Product = require('../models/products.model');
const Provider = require('../models/provider.model');

// Listar productos, usar populate para que un campo contenga todos los datos del provider asociado al producto
const listProducts = async () => {
    try {
        const products = await Product
            .find()
            .populate('provider', 'company_name CIF addres url_web -_id')
            .select('provider title price description -_id')
        console.log(products);
        return products;
    } catch (error) {
        console.log('Error listing products:', error);
    }
};

// Crear producto pasando título + provider por parámetro
async function createProduct(title, price, description, image, company_name) {
    try {
        const provider = await Provider.findOne({ company_name });
        const provider_id = provider._id.toString();
        const isProviderActive = provider.isActive;

        const product = new Product({
            title,
            price,
            description,
            image,
            provider: provider_id,
            isActive: isProviderActive
        });

        // product.isActive = isProviderActive;

        const result = await product.save();
        console.log(result);
        return result;
    } catch (error) {
        console.log('Error creating product:', error);
    }
};

// Modificar producto
const updateProduct = async (filter, update) => {
    try {
        const modifiedProduct = await Product
            .findOneAndUpdate(filter, update, {
                new: true
            });
        console.log(modifiedProduct);
        return modifiedProduct;
    } catch (error) {
        console.log('Cannot update product, error:', error)
    }
};

// Borrar product
const deleteProduct = async (filter) => {
    try {
        const removedProduct = await Product
            .deleteOne({ 'title': filter });
        console.log(removedProduct);
        return removedProduct;
    } catch (error) {
        console.log('Error deleting product:', error);
    }
};

module.exports = {
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

// createProduct('sandía', 3, 'manzana rica', 'imagenmanzana.jpg', 'Zara');

// listProducts();

// updateProduct({title: "manzana"} ,{
//         title: "manzana",
//         price: 12,
//         description: "reineta",
//         image: "manzana.jpg",
//         isActive: false
//     });

// deleteProduct('pera');


