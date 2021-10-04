class HomeControllers{
    async index(req, res){
        res.json({status: true});
    }
}

export default new HomeControllers;