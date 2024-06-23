const { response } = require('express');
const providerService = require('../services/providers.services');


const getProviders = async (req, res) => {
    let providers;
    try {
        providers = await providerService.listProviders();
        res.status(200).json(providers); // [] con las authors encontradas
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProviderController = async (req, res) => {
    const { company_name, CIF, address, url_web } = req.body;
    if (company_name && CIF && address && url_web) {
        try {
            const filter = { company_name: req.query.company_name };
            const update = { company_name, CIF, address, url_web };
            const response = await providerService.updateProvider(filter, update);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Faltan campos de provider" });
    }
};

const createProviderController = async (req, res) => {
    const { company_name, CIF, address, url_web } = req.body;
    if (company_name && CIF && address && url_web) {
        try {
            const response = await providerService.createProvider(company_name, CIF, address, url_web);
            res.status(201).json({
                "items_created": response,
                data: req.body
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Faltan campos de provider" });
    }
};

// deleteProvider
// DELETE http://localhost:3000/api/authors?company_name=name
const deleteProviderController = async (req, res) => {
    let providers;
    try {
        providers = await providerService.deleteProvider(req.query.company_name);
        res.status(200).json(providers); // [] con los providers encontradas
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const toggleProviderController = async (req, res) => {
    const company_name = req.query.company_name;
    if (company_name) {
        try {
            const response = await providerService.toggleProvider(company_name);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(response);
        }

    } else {
        res.status(400).json({ error: "Company name is required" });
    }
};


module.exports = {
    getProviders,
    createProviderController,
    updateProviderController,
    deleteProviderController,
    toggleProviderController
};