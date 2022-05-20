import Joi from 'joi';

export function signUpValidator(req,res,next) {
    const body = req.body;
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    });
    try {
        const result =  schema.validate(body);
        if (result.error) {
            throw new Error(result.error.message);
        }
        next();
    }
    catch(e) {
        return res.status(400).json({ message:'Bad Request', error: e.message});
    }
}

/**
 * validate user login 
 */
export function loginValidator(req,res,next){
    const body = req.body;
    const schema = Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    });
    try {
        const result =  schema.validate(body);
        if (result.error) {
            throw new Error(result.error.message);
        }
        next();
    }
    catch(e) {
        return res.status(400).json({ message:'Bad Request', error: e.message});
    }
}