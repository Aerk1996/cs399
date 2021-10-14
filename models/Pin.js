const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
  username:{
      type:String,
      require:true,

  },
  title:{
      type:String,
      require:true,
      min:4,
  },
  desc:{
      type:String,
      require:true,
      min:5,
  },
  rating:{
      type:Number,
      require:true,
      min:1,
      max:10,
  },
  lat:{
      type:Number,
      require:true,

  },
  lon:{
      type:Number,
      require:true,
  },
}, {timestamps:true});

module.exports = mongoose.model("Pins", PinSchema);