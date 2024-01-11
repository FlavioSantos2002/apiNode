const PartyModel = require('../models/Party')

//função de verificação de condição 
const checkPartyBudget = (budget, services) =>{
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)
    if(priceSum > budget){
        return true
    }
    return false

}

const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            };
            console.log("orca: ", party.budget)
            console.log("valor festas: ", party.services.reduce((sum, service) => sum + service.price, 0))
            if (party.services && checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "o seu orçamento é insuficiente" })
                return
            }

            const response = await PartyModel.create(party);
            res.status(201).json({ response, msg: 'festa criada com sucesso' });

        } catch (error) {
            console.log(`erro: ${error}`); // Corrigido para usar template string
            res.status(500).json({ msg: "erro ao tentar criar serviço" });
        }
    },
    getAll: async(req, res)=>{
        try {
            const parties = await PartyModel.find()
            res.status(201).json({parties, msg:'todas as festas'})
            
        } catch (error) {
            console.log('deu erro: ' + error)
            res.status(500).json({msg: 'erro ao buscar festas'})
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const party = await PartyModel.findById(id)
    
            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada" })
                return
            }
    
            res.json(party)
        } catch (error) {
            console.error("Erro ao buscar festa:", error)
            res.status(500).json({ error: `Erro ao buscar festa: ${error.message || error}` })
        }
    },
    delete: async (req, res) =>{
        try {
            const id = req.params.id
            const party = await PartyModel.findByIdAndDelete(id)

            if(!party){
                res.status(404).json({msg: 'nao foi possivel encontrar a festa'})
                return
            }
            res.json(party)

        } catch (error) {
            res.status(404).json({msg: 'nao foi possivel encontrar a festa'})
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const party = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            budget: req.body.budget,
            image: req.body.image,
            services: req.body.services
        };
    
        if (party.services && checkPartyBudget(party.budget, party.services)) {
            res.status(406).json({ msg: "O seu orçamento é insuficiente" });
            return;
        }
    
        try {
            const updateParty = await PartyModel.findByIdAndUpdate(id, party, { new: true });
    
            if (!updateParty) {
                res.status(404).json({ msg: 'Não foi possível encontrar a festa' });
                return;
            }
    
            res.status(200).json({ updateParty, msg: 'Festa atualizada com sucesso' });
        } catch (error) {
            console.error("Erro ao atualizar festa:", error);
            res.status(500).json({ error: "Erro ao atualizar festa" });
        }
    }
}

module.exports = partyController