const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) =>{
  return jwt.sign({user: user},process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) =>{
  try{
    let user = await User.findOne({email: req.body.email}).lean().exec();

    if(user)
      return res.status(400).json({
          status:"failed",
          message:"Please provide different email Id"
      });

      user = await User.create(req.body);
      const token = newToken(user);
      res.status(201).json({user,token});

  } catch(e){
    return res.status(500).json({status: 'failed',message: e.message});
  }
};

const login = async (req, res) => {
  try{

    let user = await User.findOne({email: req.body.email});
    const match = await user.checkPassword(req.body.password)

    if(!user || !match)
      return res.status(404).json({
        status: 'failed',
        message: 'Please provide valid email-Id or password',
      });

      const token = newToken(user);
      res.status(200).json({user,token});
  }catch(e){
    return  res.status(500).json({status:"failed", message:e.message});
  }
};

module.exports ={register,login}