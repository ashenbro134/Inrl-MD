const {inrl,WCG} = require("../lib")

inrl({
    on: "text",
    pattern: "wcg",
    type : "game",
    desc : "Word Chain game"
}, async (m, match) => {
    let try_to_start = new WCG(m);
    try_to_start.start();
});
