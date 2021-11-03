module.exports = function (app, express) {
    
    // Blog Post Routes
    var blogpost = require('./controllers/BlogPostController');
    app.get('/api/blogpost', blogpost.getAll);
    app.get('/api/blogpost/:id', blogpost.getById);
    app.post('/api/blogpost', blogpost.create);
    app.put('/api/blogpost/:id', blogpost.update);
    app.delete('/api/blogpost/:id', blogpost.delete);
    
    // User Routes
    var user = require('./controllers/UserController');
    app.post('/api/login', user.login);
    app.post('/api/logout', user.logout);
    app.post('/api/register', user.register);

    // Other Routes
    app.get('/api/', function (req, res) {
        res.send('testAPI');
    });

    // All other routes should redirect to the index.html
    // app.get('*', function (req, res) {
    //     res.sendfile('./public/index.html');
    // });

    
};