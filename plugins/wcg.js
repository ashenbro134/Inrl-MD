const {inrl,WCG} = require("../lib")

inrl({
    on: "text",
    pattern: "wcg",
    type: "game",
    desc: "Word Chain game",
    fromMe: 'public'
}, async (m, match) => {
    //if(m.jid == '120363040291283569@g.us') return await m.send('invalid attempt');//m.send('_*wcg*_
    let try_to_start = new WCG(m);
    try_to_start.start();
});
