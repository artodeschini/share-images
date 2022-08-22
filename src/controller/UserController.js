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
}

module.exports = new UserController();