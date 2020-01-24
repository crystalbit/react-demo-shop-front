/**
 * use browser cors plugin while using another port on localhost in dev
 * 
 * когда используем в девелопменте разные порты локалхоста, включите плагин для браузера, включающий cors
 * иначе будет ругаться на кроссдоменные запросы
 */

export default ({
    api: {
        entry: 'http://localhost:3333/api/'
    }
});
