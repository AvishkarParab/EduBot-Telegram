const {
    Telegraf
} = require('telegraf');
const axios = require("axios");
require('dotenv').config();
const express = require("express")
var app = express()

const telebot = new Telegraf(process.env.TOKEN);
const port = process.env.PORT || 5000

let greetings = ["hello", "hi", "hey", "Hi Bot", "cares"]
telebot.start((ctx) => ctx.reply('Welcome to CARES GOA chatbot :)'));

telebot.hears(greetings, async (ctx) => {
    let startserver = await startbotserver()
    if (startserver)
        ctx.reply("Hello " + ctx.chat.first_name + " " + ctx.chat.last_name)
})


telebot.hears('teach', async (ctx) => {
    let data = await getCourses()
    var keyboard = [];
    data.map((elem) => {
        keyboard.push([{
            'text': elem.cname,
            'callback_data': elem.cname
        }]);
    })

    ctx.telegram.sendMessage(ctx.chat.id, "Please select your course", {
            reply_markup: {
                inline_keyboard: keyboard
            }
        }

    );
})



telebot.action('Scratch', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, "You selected Scratch")
    let courseObj = await getCourses()
    let dataState
    courseObj.map((elem) => {
        if (elem.cname === "Kojo")
            dataState =  elem.id
    })
    let i = 0
    if (dataState) {
        //gets module for course
        let moduleResponse = await getModule(dataState)
        //if module type is video
        if (moduleResponse[i].mtype === "video")
            ctx.telegram.sendVideo(ctx.chat.id, "http://techslides.com/demos/sample-videos/small.mp4")

        //if module type is image
        else if (moduleResponse[i].mtype === "image")
            ctx.telegram.sendPhoto(ctx.chat.id, moduleResponse[i].image)

        ctx.telegram.sendMessage(ctx.chat.id, moduleResponse[i].question, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        'text': moduleResponse[i].option1,
                        'callback_data': (moduleResponse[i].correctopt === "1") ? "yes" : "no"
                    }],
                    [{
                        'text': moduleResponse[i].option2,
                        'callback_data': (moduleResponse[i].correctopt === "2") ? "yes" : "no"
                    }],
                    [{
                        'text': moduleResponse[i].option3 ? moduleResponse[i].option3 : "",
                        'callback_data': (moduleResponse[i].correctopt === "3") ? "yes" : "no"
                    }],
                    [{
                        'text': moduleResponse[i].option4 ? moduleResponse[i].option4 : "",
                        'callback_data': (moduleResponse[i].correctopt === "4") ? "yes" : "no"
                    }],
                ]
            }
        })
        telebot.action("yes", async (ctx) => {
            if (i === moduleResponse.length - 1)
                ctx.telegram.sendMessage(ctx.chat.id, "Your Course is completed")
            else {
                i++;
                //if module type is video
                if (moduleResponse[i].mtype === "video")
                    ctx.telegram.sendVideo(ctx.chat.id, "http://techslides.com/demos/sample-videos/small.mp4")

                //if module type is image
                else if (moduleResponse[i].mtype === "image")
                    ctx.telegram.sendPhoto(ctx.chat.id, moduleResponse[i].image)

                ctx.telegram.sendMessage(ctx.chat.id, moduleResponse[i].question, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                'text': moduleResponse[i].option1,
                                'callback_data': (moduleResponse[i].correctopt === "1") ? "yes" : "no"
                            }],
                            [{
                                'text': moduleResponse[i].option2,
                                'callback_data': (moduleResponse[i].correctopt === "2") ? "yes" : "no"
                            }],
                            [{
                                'text': moduleResponse[i].option3 ? moduleResponse[i].option3 : "",
                                'callback_data': (moduleResponse[i].correctopt === "3") ? "yes" : "no"
                            }],
                            [{
                                'text': moduleResponse[i].option4 ? moduleResponse[i].option4 : "",
                                'callback_data': (moduleResponse[i].correctopt === "4") ? "yes" : "no"
                            }],
                        ]
                    }
                })
            }

        });

        telebot.action("no", async (ctx) => {
            ctx.reply("Opss.. wrong choice please try again")
            // ctx.replyWithPhoto("https://c.tenor.com/WC2TxVFjEeMAAAAC/mistakes-oops.gif")

        })
    } else {
        ctx.telegram.sendMessage(ctx.chat.id, "No Course Module Found")
    }

});

telebot.action('Kojo', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, "You selected KOJO")
    let courseObj = await getCourses()
    let dataState 
    courseObj.map((elem) => {
        if (elem.cname === "Kojo")
            dataState =  elem.id
    })
    let i = 0

    if (dataState) {
        //gets module for course
        let moduleResponse = await getModule(dataState)
        //if module type is video
        if (moduleResponse[i].mtype === "video")
            ctx.telegram.sendVideo(ctx.chat.id, "http://techslides.com/demos/sample-videos/small.mp4")

        //if module type is image
        else if (moduleResponse[i].mtype === "image")
            ctx.telegram.sendPhoto(ctx.chat.id, moduleResponse[i].image)

        ctx.telegram.sendMessage(ctx.chat.id, moduleResponse[i].question, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        'text': moduleResponse[i].option1,
                        'callback_data': (moduleResponse[i].correctopt === "1") ? "yes" : "no"
                    }],
                    [{
                        'text': moduleResponse[i].option2,
                        'callback_data': (moduleResponse[i].correctopt === "2") ? "yes" : "no"
                    }],
                    [{
                        'text': moduleResponse[i].option3 ? moduleResponse[i].option3 : "",
                        'callback_data': (moduleResponse[i].correctopt === "3") ? "yes" : "no"
                    }],
                    [{
                        'text': moduleResponse[i].option4 ? moduleResponse[i].option4 : "",
                        'callback_data': (moduleResponse[i].correctopt === "4") ? "yes" : "no"
                    }],
                ]
            }
        })
        telebot.action("yes", async (ctx) => {
            if (i === moduleResponse.length - 1)
                ctx.telegram.sendMessage(ctx.chat.id, "Your Course is completed")
            else {
                i++;
                //if module type is video
                if (moduleResponse[i].mtype === "video")
                    ctx.telegram.sendVideo(ctx.chat.id, "http://techslides.com/demos/sample-videos/small.mp4")

                //if module type is image
                else if (moduleResponse[i].mtype === "image")
                    ctx.telegram.sendPhoto(ctx.chat.id, moduleResponse[i].image)

                ctx.telegram.sendMessage(ctx.chat.id, moduleResponse[i].question, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                'text': moduleResponse[i].option1,
                                'callback_data': (moduleResponse[i].correctopt === "1") ? "yes" : "no"
                            }],
                            [{
                                'text': moduleResponse[i].option2,
                                'callback_data': (moduleResponse[i].correctopt === "2") ? "yes" : "no"
                            }],
                            [{
                                'text': moduleResponse[i].option3 ? moduleResponse[i].option3 : "",
                                'callback_data': (moduleResponse[i].correctopt === "3") ? "yes" : "no"
                            }],
                            [{
                                'text': moduleResponse[i].option4 ? moduleResponse[i].option4 : "",
                                'callback_data': (moduleResponse[i].correctopt === "4") ? "yes" : "no"
                            }],
                        ]
                    }
                })
            }

        });

        telebot.action("no", async (ctx) => {
            ctx.reply("Opss.. wrong choice please try again")
            // ctx.replyWithPhoto("https://c.tenor.com/WC2TxVFjEeMAAAAC/mistakes-oops.gif")

        })
    } else {
        ctx.telegram.sendMessage(ctx.chat.id, "No Course Module Found")
    }

});


//function definded here !!
async function getCourses() {
    let url = "http://localhost:5000/course";
    try {
        const resp = await axios.get(url);

        let courseArr = resp.data.result;
        return courseArr;

    } catch (error) {
        console.log(error);
    }

}


async function getModule(id) {
    
    let url = `http://localhost:5000/module/?cid=${id}`;
    try {
        const resp = await axios.get(url);

        let moduleArr = resp.data.result;
        return moduleArr;

    } catch (error) {
        console.log(error);
    }

}

async function startbotserver() {
    let url = `http://localhost:5000`;
    try {
        const resp = await axios.get(url);
        if (resp)
            return true;
        else
            return false

    } catch (error) {
        console.log(error);
    }

}

telebot.launch();
app.get("/", (req, res) => {
    res.send("EduBot Server is Live")
});
app.listen(port, () => {
    console.log("Server started");
})