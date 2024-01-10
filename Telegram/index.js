const Telebot = require("telebot");
const CONSTANTS = require("./constants");

const bot = new Telebot({
    token: CONSTANTS.TELEGRAM_TOKEN
})

bot.on(["/start"], (msg) => {
    bot.sendMessage(msg.chat.id, `¡Encantado de conocerte, ${msg.chat.username}! Te doy la bienvenida a Anirec.\nPrueba a utilizar alguno de mis comandos de recomendación 📖\n\n   ⭐ - Escribe "/rec" y a continuación el nombre de un anime para ver sugerencias relacionadas a este\n   💥 - Escribe "/recpop", para recibir sugerencias aleatorias entre los animes más populares del momento\n\nTambién puedes utilizar el menú desplegable de la aplicación para acceder a los comandos ⚙️`)
})


bot.on(["/rec"], async (msg) => {
    const opts = {parse_mode: 'MarkdownV2'};
    //bot.sendMessage(msg.chat.id, ``);
        setTimeout(() => {bot.sendMessage(msg.chat.id,
            `Hola, ${msg.chat.username}. Me alegra que te guste ${msg.chat}, ¡es una gran elección! 😊\n\nBasándome en tu preferencia, voy a seleccionar tres animes similares. A ver qué te parecen.`)},
            1000);

        const queryEngine = LlamaIndex.asQueryEngine();
        const response = await queryEngine.queryRec("${msg.chat}");
        bot.sendMessage(msg.chat.id, response);
})




bot.on(["/recpop"], async (msg) => {
    const opts = {parse_mode: 'MarkdownV2'};
    //bot.sendMessage(msg.chat.id, ``);
        setTimeout(() => {bot.sendMessage(msg.chat.id,
            `Voy a recomendarte tres animes que están ahora mismo de moda basándome en las encuestas de anilist.`)},
            900);

    const queryEngine = LlamaIndex.asQueryEngine();
    const response = await queryEngine.queryRecPop();
    bot.sendMessage(msg.chat.id, response);

})


bot.start();