const {
    inrl,
    UpdateVariable
} = require('../lib')

inrl({
    pattern: "welcome",
    desc: "set welcome message",
    react: "👀",
    type: 'greetings',
    fromMe: true
}, async (message, match, data) => {
    if(match == "get"){
    return await message.send(data.WELCOME_MSG);
    } else if(match){
    await UpdateVariable("WELCOME_MSG", match, message.conn.user.number);
    return await message.send('*success*\n*_restart an try_*');
    }
    return await message.send('_*welcome get*_\n_*welcome* thank you for joining &mention_\n*welcome false_*');
});
inrl({
    pattern: "goodbye",
    desc: "set exit message",
    react: "😏",
    type: 'greetings',
    fromMe: true
}, async (message, match, data) => {
    if(match == "get"){
    return await message.send(data.EXIT_MSG);
    } else if(match){
    await UpdateVariable("EXIT_MSG", match, message.conn.user.number);
    return await message.send('*success*\n*_restart an try_*');
    }
    return await message.send('_*goodbye get*_\n_*goodbye* go out kid😶_\n*_goodbye false_*');
});
