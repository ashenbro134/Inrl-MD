/*

"pdfkit": "^0.13.0",
const {
        inrl
} = require('../lib'),
        imgToPDF = require('image-to-pdf'),
        fs = require('fs'), {
                fromBuffer
        } = require('file-type'),
        Fs = require("node:fs/promises"),
        pdfPath = './media/pdf',
        res = './media/converted.pdf',
        path = require('path');
inrl({
        pattern: 'pdf ?(.*)',
        desc: "Images to PDF",
        type: 'converters',
        usage: `_1. Input images using .pdf_\n_2. Get output pdf using .pdf get_\n_3. Added images by mistake? then delete all inputted images using .pdf delete_\n_4. All files will be auto deleted after the output is produced_`
}, async (message, match) => {
        if (!fs.existsSync(pdfPath)) {
                fs.mkdirSync(pdfPath)
        }
        if (match?.toLowerCase() == 'delete') {
                for (const file of await Fs.readdir(pdfPath)) {
                        await Fs.unlink(path.join(pdfPath, file));
                }
                try {
                        await Fs.unlink(res)
                } catch {}
                await message.send(`_Successfully cleared all files!_`)
        } else if (match?.toLowerCase() == 'get') {
                const pages = (await fs.readdirSync(pdfPath)).filter(e => e.includes('topdf')).map(e => pdfPath + '/' + e)
                if (!pages.length) return await message.send('_No files inputted_')
                imgToPDF(pages, imgToPDF.sizes.A4).pipe(fs.createWriteStream(res)).on('finish', async () => {
                        await message.client.sendMessage(message.jid, {
                                document: {
                                        url: res
                                },
                                mimetype: 'application/pdf',
                                fileName: 'converted.pdf'
                        }, {
                                quoted: message
                        })
                        for (const file of await Fs.readdir(pdfPath)) {
                                await Fs.unlink(path.join(pdfPath, file));
                        }
                        await Fs.unlink(res)
                })
        } else if (message.reply_message.msg) {
                let savedFile = await message.reply_message.download()
                let {
                        mime
                } = await fromBuffer(savedFile)
                if (mime.includes('image')) {
                        const pages = (await fs.readdirSync(pdfPath)).filter(e => e.includes('topdf'))
                        await fs.writeFileSync(pdfPath + '/topdf_' + pages.length + '.jpg', savedFile)
                        return await message.send(`*_Successfully saved image_*\n_*Total saved images: ${pages.length+1}*_\n*_After saving all images, use '.pdf get' to get the result. Images will be deleted after conversion!_*`)
                } else {
                        return await message.send('_Reply to any image!_')
                }
        } else return await message.send('_Reply to any image, get helps by using ".pdf help" command_')
});
*/
