const service = require('../service/UserService');

class UserController {

    async create(req, res) {
        try {
            const check = await service.create(req.body); 
            
            if (check.status) {
                res.status(201)
                res.json(check);

            } else {
                res.status(400)
                res.json(check);
            }
        
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json(check);
        }
    }

    async remove(req, res) {
        const result = await service.delete(req.params.email);
        if (result) {
            res.status(204);
        } else {
            res.status(500);
        }
    }
}

module.exports = new UserController();