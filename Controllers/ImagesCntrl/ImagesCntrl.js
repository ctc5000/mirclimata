const {models} = require("../../sequelize");
const {Op} = require("sequelize");
async function CreateImage(imglinq,qrlinq) {
     let ImageResult = await models.Images.create({
         orginalimage:imglinq,
         qrimage:qrlinq,
     })

    return ImageResult;
}
async function GetImage(id)
{
    return await models.Images.findOne({where:{id:id}});
}
module.exports =
    {
        CreateImage,
        GetImage,

    }