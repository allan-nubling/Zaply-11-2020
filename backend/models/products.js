const limit = {
    small: 10,
    medium: 20,
    large: 30
}

module.exports = app => {
    //Validação de dados
    const existsOrError = app.utils.validation.existsOrError
    const minorOrError  = app.utils.validation.minorOrError(1e6)

    //consultar produto
    const getOne = async (req, res) => {
        const { id } = req.params
        try {
            app.db.sql('dummy_data')
                .select('*')
                .where({ id })
                .first()
                .then(product => res.json(existsOrError(product, 'Produto não encontrado.')))
                .catch(err => res.status(500).send(err))
        } catch(err) {
            res.status(400).send(err)
        }
    }

    //consultar lista de produtos
    const getList = async (req, res) => {
        const page = req.query.page || 1
        const lt = req.query.lt || 'small'
        const { qry, val, order, by } = req.query
        const _order = order && by ? { column: by, order } : {column: 'id', order: 'asc'}
        
        if(!qry){
            const result = await app.db.sql('dummy_data').count('id').first()
            const count = Math.ceil(result['count(`id`)']/limit[lt]) // nº de páginas
            app.db.sql('dummy_data')
                .orderBy( _order.column, _order.order )
                .select('id', 'name', 'image', 'categories', 'price', 'brand')
                .limit(limit[lt])
                .offset(limit[lt]*page - limit[lt])
                .then(products => res.json({products, count}))
                .catch(err => res.status(500).send(err))
        } else {
            const query = [qry, 'like', `%${val}%`] // Transformar params da requisição em uma query do tipo (ColumName, like, %Valor%)
            const result = await app.db.sql('dummy_data').where(...query).count('id').first()
            const count = Math.ceil(result['count(`id`)']/limit[lt]) // nº de páginas
            app.db.sql('dummy_data')
                .orderBy( _order.column, _order.order )
                .select('id', 'name', 'image', 'categories', 'price', 'brand')
                .where(...query)
                .limit(limit[lt])
                .offset(limit[lt]*page - limit[lt])
                .then(products => res.json({products, count}))
                .catch(err => res.status(500).send(err))
        }
    }

    //cadastrar produto
    const post = async (req, res) => {
        const { data } = req.body
        try {
            //Permitir o cadastro de um array de produtos
            const products = Array.isArray(data) ? data : [data]
            products.forEach(product => {
                existsOrError(product, 'Os parametros não são válidos.')
                existsOrError(product.id, 'Id inválido.')
                existsOrError(product.name, 'Nome inválido.')
                minorOrError(product.price, 'O preço é maior que o permitido.')
            })
            app.db.sql('dummy_data')
                .insert( products )
                .then(res.send("Item inserido com sucesso."))
                .catch(res.status(500).send())
        } catch(err) {
            res.status(400).send(err)
        }
    }

    //atualizar produto
    const update = async (req, res) => {
        const { id } = req.params
        const { product } = req.body
        try {
            existsOrError(product, 'Os parametros não são válidos.')
            existsOrError(id, 'Item não necontrado..')
            existsOrError(product.name, 'Nome inválido.')
            minorOrError(product.price, 'O preço é maior que o permitido.')
            const _product = await app.db.sql('dummy_data').where({ id }).first()
            existsOrError(_product, 'item não necontrado.')
            app.db.sql('dummy_data').where({ id }).first()
                .update({
                    ...product,
                    updated_at: new Date,
                })
                .then(r => { if(r == 1) res.send('Item atualizado com sucesso.') })
                .catch(err => res.status(500).send(err))
        } catch(err) {
            res.status(400).send(err)
        }
    }

    //deletar produto
    const delet = async (req, res) => {
        const { id } = req.params
        try {
            existsOrError(id, 'item não necontrado.')
            const product = await app.db.sql('dummy_data').where({ id }).first()
            existsOrError(product, 'item não necontrado.')
            app.db.sql('dummy_data').where({ id }).del()
                .then(rows => { if(existsOrError(rows) == 1) res.send('Item deletado com sucesso.') })
                .catch(console.err)
        } catch(err) {
            res.status(400).send(err)
        }
    }

    return { getOne, getList, post, update, delet }
}