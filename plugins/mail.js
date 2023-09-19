const {
        inrl
} = require('../lib/');
const axios = require('axios');
const {
        BASE_URL
} = require('../config');
inrl({
        pattern: '$tempmail',
        desc: 'get temporary mail for 10 minutes',
        react: "🙃",
        type: "utility"
}, async (message, match) => {
        try {
                const {
                        data
                } = await axios('https://inrl-web.onrender.com/api/getmail?apikey=inrl');
                if (data.status && data.result && data.result.length > 0) {
                        const tempMails = data.result.join('\n');
                        const replyMessage = `*Temporary Email Addresses:*\n\n${tempMails}\n\n use \`\`\`\checkmail <mail-address>\`\`\`\ if you want to check inbox of any temp mail used from above`;
                        return await m.reply(replyMessage);
                } else {
                        return await m.reply('No temporary email addresses found.');
                }
        } catch (error) {
                console.error('Error:', error);
                return await m.reply('Failed to fetch temporary email addresses.');
        }
});
inrl({
        pattern: '$checkmail',
        desc: 'get temporary mail messages',
        react: "🙃",
        type: "utility"
}, async (message, match) => {
        match = match || message.reply_message.text;
        if (!match) return await m.reply('Please provide some text or quote a message to get a response.');
        const mail = match.match(/[^< ]+(?=>)/g);
        if (!mail[0]) return await message.send("_give me an mail id!_");
        try {
                const {
                        data
                } = await axios(`https://inrl-web.onrender.com/api/getmailinfo?email=${encodeURIComponent(mail[0])}&apikey=inrl`);
                if (data.status && data.result && data.result.length > 0) {
                        const messages = data.result.map((message) => {
                                return `
*From:* ${message.from}
*Subject:* ${message.subject}
*Date:* ${message.date}
*Body:*
${message.text}
          `;
                        }).join('\n\n---\n\n');
                        const replyMessage = `*Messages in* ${mail[0]}:\n\n${messages}`;
                        return await m.reply(replyMessage);
                } else {
                        return await m.reply(`No messages found in ${mail[0]}.`);
                }
        } catch (error) {
                console.error('Error:', error);
                return await m.reply(`Failed to check messages in ${mail[0]}.`);
        }
});
