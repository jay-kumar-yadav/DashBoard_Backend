// Validation middleware using Joi
const Joi = require('joi');

// Register validation schema
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required()
  });

  return schema.validate(data);
};

// Login validation schema
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(data);
};

// Profile validation schema
const profileValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    phone: Joi.string().min(10).max(15).required(),
    instagram: Joi.string().uri().allow(''),
    youtube: Joi.string().uri().allow('')
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  profileValidation
};