const { Service: ServiceModel } = require('../models/Service');

const serviceController = {
    create: async (req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            };

            const response = await ServiceModel.create(service);
            res.status(201).json({ response, msg: 'Serviço criado com sucesso' });
        } catch (error) {
            console.error('Erro ao criar serviço:', error);
            res.status(500).json({ error: 'Erro interno ao criar o serviço' });
        }
    },
    getAll: async (req, res)=>{
        try{
            const services = await ServiceModel.find();
            res.json(services)
        }catch(error){
            console.log("deu erro: " + error)
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const service = await ServiceModel.findById(id)
    
            if (!service) {
                res.status(404).json({ msg: "serviço não encontrado" })
                return
            }
    
            res.json(service)
        } catch (error) {
            console.error("Erro ao buscar serviço:", error)
            res.status(500).json({ error: "Erro ao buscar serviço" })
        } 
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            
            const deletedService = await ServiceModel.findByIdAndDelete(id);
    
            if (!deletedService) {
                res.status(404).json({ msg: "Serviço não encontrado" });
                return;
            }
    
            res.status(200).json({ deletedService, msg: "Serviço excluído" });
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
            res.status(500).json({ error: "Erro ao excluir serviço" });
        }
    },
    update: async (req, res) => {
        const id = req.params.id

        const service = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(id, service)

        if (!updatedService) {
            res.status(404).json({ msg: "serviço não encontrado" })
            return
        }

        res.status(200).json({service, msg: "Atualização feita com sucesso"})

    } 
}


module.exports = serviceController;
