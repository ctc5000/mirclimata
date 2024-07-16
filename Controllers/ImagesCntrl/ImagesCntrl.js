
async function GetImage(imageName) {
        let url = "https://test.ru/";
            await QRCode.toFile('uploads/qrs/qrcod_' + Tables[i].number + '.png', url, {
                color: {
                    dark: '#000',
                    light: '#fff',
                }
            }, function (err) {
                if (err) throw err
                //console.log('done')
            })
            console.log("creating");

    return true;
}
module.exports =
    {
        GetImage,

    }