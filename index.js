var express = require('express'),
    path = require('path'),
    app = express(),
    parser = require('body-parser');

app.disable('x-powered-by');
app.set('view engine', 'jade');
app.use(parser.urlencoded({extended:true}));

var store = {
    main: {
        page: 'TEST PAGE MAIN!!!',
        content: 'content text....'
    },
    help: {
        page: 'TEST PAGE HELP',
        content: 'content text....'
    },
    download: {
        page: 'DOWNLOAD!!!',
        content: 'content text....'
    }

}

storeKeys = Object.keys(store);

app.route('/new')
    .get((req, res) => {
    res.render('new', {
    page: 'Add Page',
    links: storeKeys})
})
.post((req, res) => {
        var body = req.body;
        if(body.pageurl&&body.pagename&&body.pagecontent)
        store[body.pageurl] = {
            page: body.pagename,
            content: body.pagecontent
        };
        storeKeys = Object.keys(store);
        res.redirect('/');
    }
);

app.get('/:page?', (req, res) => {
    var page = req.params.page, data;
if (!page) page = 'main';
console.log(page);
data = store[page];
if (!data) return res.redirect('/');
data.links = storeKeys;
res.render('main', data);
})
;


app.use((req, res, next) => {
    console.log('%s %s', req.method, req.url);
next();
})
;

var server = app.listen(3000, () => {
    console.log('server started!');
})
;