const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const {settings} = require("express/lib/application");
const file = fs.readFileSync('./climat.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
const QRCode = require('qrcode');

process.env.TZ = 'Europe/Samara';
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const ImageCntrl = require('./Controllers/ImagesCntrl/ImagesCntrl');

const routes = {
    //SALE_LOGIC
   images: require('./Controllers/ImagesCntrl/ImagesCntrlView'),
    /*     fruits: require('./Controllers/Fruits/FruitsView'),
        friends: require('./Controllers/Friends/FriendsView'),
        gamelvls: require('./Controllers/LvlBoard/LvlBoardView'),
        liderboard: require('./Controllers/LiderBoard/LiderBoardView'),
        dailyTasks: require('./Controllers/DailyTasks/DailyTasksView'),
        settings: require('./Controllers/Settings/SettingsView'),
        stamina: require('./Controllers/Stamina/StaminaView'),
        money: require('./Controllers/Money/MoneyView'),
        drakariki: require('./Controllers/Drakariki/DrakarikiView'),
        items: require('./Controllers/Items/ItemsView'),
        cards: require('./Controllers/Cards/CardsView'),
        qrs: require('./Controllers/QrCodes/QrView'),*/

};


// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
    return async function (req, res, next) {
        try {
            // console.log(req.body);
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

app.get('/', (req, res) => {
    res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/test'>/api/test</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
	`);
});


const multer = require('multer');
const upload = multer({dest: 'uploads/'})
app.post('/api/upload', upload.single('file'), async function (req, res, next) {
    let timestamp = Date.now();
    let filename = "img/" + timestamp + ".png";
    let url =process.env.SERVER +filename;
    let qrcode = 'qrs/qrcod_' + timestamp + '.png';

    await fs.rename(req.file.path, "uploads/" + filename, async function (err) {
        if (err) throw err;

        QRCode.toFile("uploads/"+qrcode, url, {
            color: {
                dark: '#000',
                light: '#fff',
            }
        }, async function (err) {
            if (err) throw err;

            console.log(url);
            console.log(qrcode);

            let ImageResult = await ImageCntrl.CreateImage(url, process.env.SERVER +qrcode);
            res.json(ImageResult);
        });
    });
});


for (const [routeName, routeController] of Object.entries(routes)) {


    if (routeController.GetImage) {
        app.get(
            `/api/${routeName}/getimage`,
            makeHandlerAwareOfAsyncErrors(routeController.GetImage)
        );
    }




//Базовые методы
    if (routeController.getAll) {
        app.get(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.getAll)
        );
    }
    if (routeController.getById) {
        app.get(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.getById)
        );
    }
    if (routeController.create) {
        app.post(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.create)
        );
    }
    if (routeController.update) {
        app.put(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.update)
        );
    }
    if (routeController.remove) {
        app.delete(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.remove)
        );
    }
}


module.exports = app;
