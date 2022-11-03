const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const axios = require("axios");
const Routes = require("./routes")
require("./db/connection")
require('dotenv').config();

const telebot = new Telegraf(process.env.TOKEN);


telebot.start((ctx) => ctx.reply('Welcome to CARES GOA chatbot :)'));


telebot.command('course', async(ctx) =>{
    let data = await getCourses()
    var keyboard = [];
    data.map((elem)=>{
        keyboard.push([{'text': elem.cname, 'callback_data': elem.cname}]);
    })

    ctx.telegram.sendMessage(ctx.chat.id,"Please select your course",
    {
        reply_markup:{
            inline_keyboard:keyboard
        }
    }

    ); 
})



telebot.action('Scratch',async(ctx)=>{
    ctx.telegram.sendMessage(ctx.chat.id ,"You selected Scratch")
    let courseObj = await getCourses()
    let dataState = courseObj.map((elem) =>{
        if(elem.cname==="Scratch")
            return elem.id
        else
            return false;
    })

    if(dataState){
        let moduleResponse = await getModule(dataState)
        let i=0
            if(moduleResponse[i].mtype === "video")
            ctx.telegram.sendVideo(ctx.chat.id ,"http://techslides.com/demos/sample-videos/small.mp4")
            else
            ctx.telegram.sendPhoto(ctx.chat.id,"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
            ctx.telegram.sendMessage(ctx.chat.id ,moduleResponse[i].question,{
            reply_markup:{
                inline_keyboard:[
                    [{'text': moduleResponse[i].option1, 'callback_data': (moduleResponse[i].correctopt==="1")?"yes":"no"}],
                    [{'text': moduleResponse[i].option2, 'callback_data': (moduleResponse[i].correctopt==="2")?"yes":"no"}],
                ]
            }
        })
        telebot.action("yes",async(ctx)=>{
            if(i === moduleResponse.length-1)
                ctx.telegram.sendMessage(ctx.chat.id ,"Your Course is completed")
            else
            {i+=1
                if(moduleResponse[i].mtype === "video")
                ctx.telegram.sendVideo(ctx.chat.id ,"http://techslides.com/demos/sample-videos/small.mp4")
                else
                ctx.telegram.sendPhoto(ctx.chat.id,"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
            ctx.telegram.sendMessage(ctx.chat.id ,moduleResponse[i].question,{
            reply_markup:{
                inline_keyboard:[
                    [{'text': moduleResponse[i].option1, 'callback_data': (moduleResponse[i].correctopt==="1")?"yes":"no"}],
                    [{'text': moduleResponse[i].option2, 'callback_data': (moduleResponse[i].correctopt==="2")?"yes":"no"}],
                ]
            }
        })}

        });

        // ctx.telegram.sendVideo(ctx.chat.id ,"http://techslides.com/demos/sample-videos/small.mp4")
        // ctx.telegram.sendMessage(ctx.chat.id ,moduleResponse[0].question,{
        //     reply_markup:{
        //         inline_keyboard:[
        //             [{'text': moduleResponse[0].option1, 'callback_data': (moduleResponse[0].correctopt==="1")?"yes":"no"}],
        //             [{'text': moduleResponse[0].option2, 'callback_data': (moduleResponse[0].correctopt==="2")?"yes":"no"}],
        //         ]
        //     }
        // })

        // telebot.action("yes",async(ctx)=>{
        //     // ctx.telegram.sendMessage(ctx.chat.id ,moduleResponse[1].videolink)
        //     ctx.telegram.sendVideo(ctx.chat.id ,"http://techslides.com/demos/sample-videos/small.mp4")
        //     ctx.telegram.sendMessage(ctx.chat.id ,moduleResponse[1].question,{
        //     reply_markup:{
        //         inline_keyboard:[
        //             [{'text': moduleResponse[1].option1, 'callback_data': (moduleResponse[1].correctopt==="1")?"yes":"no"}],
        //             [{'text': moduleResponse[1].option2, 'callback_data': (moduleResponse[1].correctopt==="2")?"yes":"no"}],
        //         ]
        //     }
        // })

        // });
       
    }
    else{
        ctx.telegram.sendMessage(ctx.chat.id ,"No Course Module Found")
    }
    // let data = await getData(ctx.match);
    // ctx.telegram.sendMessage(ctx.chat.id,data,
    // {
    //     reply_markup:{
    //         inline_keyboard:[
    //             [
    //                 {text:"Back",callback_data:"menu"},

    //             ]
    //         ]
    //     }
    // }

    // ); 
});




telebot.action('MH',async(ctx)=>{
    // ctx.deleteMessage()
    let data = await getData(ctx.match);
    ctx.telegram.sendMessage(ctx.chat.id,data,
    {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:"Back",callback_data:"menu"},

                ]
            ]
        }
    }

    ); 
});
telebot.action('KA',async(ctx)=>{
    // ctx.deleteMessage()
    let data = await getData(ctx.match);
    ctx.telegram.sendMessage(ctx.chat.id,data,
    {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:"Back",callback_data:"menu"},

                ]
            ]
        }
    }

    ); 
});


telebot.action('menu',ctx=>{
    // ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id,"Helloo Noob",
    {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:"GOA",callback_data:"GA"},
                    {text:"MAHARASHTRA",callback_data:"MH"},
                    {text:"KARNATAKA",callback_data:"KA"},
                ]
            ]
        }
    }

    ); 
});


async function getCourses(){
    let url = "http://localhost:5000/course";
    try {
        const resp = await axios.get(url);

        let courseArr = resp.data.result;
        return courseArr;

    } catch (error) {
        console.log(error);
    }
    
}


async function getModule(id){
    let url = `http://localhost:5000/module/?cid=${id}`;
    try {
        const resp = await axios.get(url);

        let moduleArr = resp.data.result;
        return moduleArr;

    } catch (error) {
        console.log(error);
    }
    
}


telebot.launch();