const { User } = require("../../models/user");

module.exports = {
  Query: {
    user: async(parent, args, context, info)=>{
      try {
        const user = await User.findOne({'_id': args.id }); 
        return user;
      } catch (err) {
        throw err;
      }
    }
  }
}

