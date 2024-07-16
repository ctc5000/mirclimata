const ImagesCntrl = require('./ImagesCntrl');

async function GenerateQrOn(req, res) {

    const QR = await ImagesCntrl.GetImage(req.url);
    res.json(QR);
}