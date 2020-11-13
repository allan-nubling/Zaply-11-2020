exports.up = function(knex) {
    return knex.schema.createTable('dummy_data', colum =>{
        colum.string('id', 10).primary()
        colum.string('image')
        colum.string('name')
        colum.string('categories')
        colum.float('price')
        colum.string('brand', 50)
        colum.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('dummy_data')
};