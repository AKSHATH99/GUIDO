import mongoose, { Schema } from "mongoose";

const studentModel = new Schema({

  //basic personal details

  firstname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  gmail: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  place: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  language_spoken: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  //education details
  education : [{
    collegeName: {
        type: String,
        required: true,
        trim: true,
      },
      degreeName: {
        type: String,
        required: true,
        trim: true,
      },
      passoutYear: {
        type: Number,
        required: true,
        trim: true,
      },
      currentYear : {
        type: Number,
        required: true,
        trim : true
      }
  }],

  //skills details

  skills: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  resume: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  //social links
  github: {
    type: String,
    trim: true,
    index: true,
  },
  linkedin: {
    type: String,
    trim: true,
    index: true,
  },
  twitter: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  //interested field 
  interests : {
    type: String,
    required: true,
    trim: true,
    index: true,
  }
})