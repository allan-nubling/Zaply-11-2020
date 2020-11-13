module.exports = app => {
    with(app.models.products){
        app.route('/products/:id')
            .all(app.configs.passport)
            .get(getOne)
            .put(update)
            .delete(delet)
            
        app.route('/products')
            .all(app.configs.passport)
            .get(getList)
            .post(post)
    }

    // app.get('/', function (req, res) {
    //     res.redirect('/index.html')
    //   })

    //404 handler
    app.route('*')
        .get((req, res) => {
            res.status(404).send('Err 404 - NOT FOUND - Zaply API')
        })
}