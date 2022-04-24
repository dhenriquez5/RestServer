const {Schema,model} = require('mongoose')

const RoleSchema = Schema({
    rol: {type: String, required: true,unique: true}
})

module.exports =model('Role',RoleSchema);