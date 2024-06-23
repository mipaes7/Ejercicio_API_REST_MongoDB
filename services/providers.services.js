const Provider = require('../models/provider.model');
const Product = require('../models/products.model');

// Listar providers GET
const listProviders = async () => {
    try {
        const providers = await Provider
            .find()
        console.log(providers);
        return providers;
    } catch (error) {
        console.log('Error listing providers:', error);
    }
};

// Crear provider POST
async function createProvider(company_name, CIF, address, url_web, isActive) {
    try {
        const provider = new Provider({
            company_name,
            CIF,
            address,
            url_web,
            isActive
        });
    
        const result = await provider.save();
        console.log(result);
        return result;

    } catch (error) {
        console.log('Error creating provider:', error);
    }
}

// Editar provider PUT
const updateProvider = async (filter, update) => {
    try {
        const modifiedProvider = await Provider
            .findOneAndUpdate(filter, update, {
                new: true
            });
        console.log(modifiedProvider);
        return modifiedProvider;
    } catch (error) {
        console.log('Cannot update provider, error:', error)
    }
};

// Borrar provider
const deleteProvider = async (filter) => {
    try {
        const removedProvider = await Provider
            .deleteOne({ 'company_name': filter });
        console.log(removedProvider);
        return removedProvider;
    } catch (error) {
        console.log('Error deleting provider:', error);
    }
};

// Toggle provider en lugar de borrar
const toggleProvider = async (company_name) => {
    try {
        const provider = await Provider
            .findOne({ "company_name": company_name });
        if (!provider) {
            throw new Error('Provider not found');
        }
        provider.isActive = !provider.isActive;
        await provider.save();

        await Product
            .updateMany({ provider: provider._id }, { isActive: provider.isActive });

        return provider;
    } catch (error) {
        console.log("Unable to toggle:", error);
    }
};

module.exports = {
    listProviders,
    updateProvider,
    createProvider,
    deleteProvider,
    toggleProvider
};

// createProvider('Zara', 'Z40236882', 'Calle de Prim 49', 'https://www.zara.com', 'true');

// {
//     "company_name": "Alcampo",
//     "CIF": "A40236882",
//     "address": "Calle de Fulgencio 12",
//     "url_web": "https://www.druni.com",
//     "isActive": "true"
// }

//GET
// listProviders();

//PUT
// updateProvider({company_name: "Alcampo"} ,{
//     company_name: "Alcampo",
//     CIF: "A40236882",
//     address: "Calle de Fulgencio 117",
//     url_web: "https://www.alcampo.com"
// });

// deleteProvider('Primaprix');