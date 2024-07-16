const ImagesCntrl = require('./ImagesCntrl');


async function GetImage(req, res) {

    const Result = await ImagesCntrl.GetImage(req.query.id);
    res.json(Result);
}
module.exports =
    {
        GetImage,

    }