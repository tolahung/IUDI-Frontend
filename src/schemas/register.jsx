import Joi from 'joi'

const registerSchema = Joi.object({
    Username: Joi.string().required(),
    FullName: Joi.string().required(),
    Email: Joi.string().required(),
    Password: Joi.string().min(6).max(32).required().messages({
        'string.min': 'Password can\'t be less than 6 letters!',
        'string.max': 'Password can\'t be more than 32 letters!',
        'any.required': 'Password can\'t be empty!',
        'string.empty': 'Password can\'t be empty!'
    }),
    Latitude: Joi.required().messages({
        'any.required': 'Can\'t identify your geolocation!',
        'string.empty': 'Can\'t identify your geolocation!'
    }),
    Longitude: Joi.required().messages({
        'any.required': 'Can\'t identify your geolocation!',
        'string.empty': 'Can\'t identify your geolocation!'
    }),
    LastLoginIP :Joi.string().required(),
    avatarLink: Joi.string().required(),
    Cf_Password: Joi.valid(Joi.ref('Password')).messages({
        'any.only':'Password no match!'
    })
})

export default registerSchema