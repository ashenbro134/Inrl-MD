const {inrl,WCG} = require("../lib")

inrl({
    on: "text",
    pattern: "wcg"
}, async (m, match) => {
    let try_to_start = new WCG(m);
    try_to_start.start();
});
