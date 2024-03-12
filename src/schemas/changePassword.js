import Joi from 'joi';

const changePasswordSchema = Joi.object({
  Password: Joi.string().min(6).max(32).required().messages({
    'string.min': 'Password can\'t be less than 6 letters!',
    'string.max': 'Password can\'t be more than 32 letters!',
    'any.required': 'Password can\'t be empty!',
    'string.empty': 'Password can\'t be empty!'
}),
  NewPassword:  Joi.string().min(6).max(32).required().messages({
    'string.min': 'Password can\'t be less than 6 letters!',
    'string.max': 'Password can\'t be more than 32 letters!',
    'any.required': 'Password can\'t be empty!',
    'string.empty': 'Password can\'t be empty!'
}),
  CfNewPassword:  Joi.valid(Joi.ref('NewPassword')).messages({
    'any.only':'Password no match!'
})
})

export default changePasswordSchema