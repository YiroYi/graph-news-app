const moongoose = require("moongoose");
const Schema = moongoose.Schema;

const postSchema = new Schema({
  title:{
    required: true,
    type: String,
    maxlength: 100
  },
  excerpt:{
    required: true,
    type: String,
    maxlength: 1000
  },
  content:{
    required: true,
    type: String,
    maxlength: 5000
  },
  author:{
    type: Schema.Types.ObjectId,
    ref: User,
    require: true
  },
  status:{
    type: String,
    enum: ['DRAFT', 'PUBLIC'],
    default: 'DRAFT'
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }
