const { Jimp } = require('jimp');

async function processImages() {
    try {
        const img1 = await Jimp.read('public/images/vizuki_card_1.png');
        img1.crop({ x: 45, y: 120, w: 500, h: 230 });
        await img1.write('public/images/vizuki_field.jpg');
        await img1.write('assets/vizuki_field.jpg');
        await img1.write('dist/assets/vizuki_field.jpg');
        console.log('Saved vizuki_field.jpg');

        const img2 = await Jimp.read('public/images/vizuki_card_2.png');
        img2.crop({ x: 50, y: 120, w: 220, h: 220 });
        await img2.write('public/images/vizuki_machine.png');
        await img2.write('assets/vizuki_machine.png');
        await img2.write('dist/assets/vizuki_machine.png');
        console.log('Saved vizuki_machine.png');

    } catch (e) {
        console.error(e);
    }
}
processImages();
