const service = require('../service/UserService');

class UserController {

    async create(req, res) {
        try {
            service.create(req.body); 
            res.status(201)
            res.json({});
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({});
        }
        
    }
}

module.exports = new UserController();