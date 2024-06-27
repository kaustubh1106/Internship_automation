const { assesment } = require("./utils/assesment.js")

const details =async ()=>{
    const res = await assesment({"text": "some question"})
    console.log(res)
}

details()