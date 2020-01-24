/**
 * use browser cors plugin while using another port on localhost in dev
 * for production use /api/ as api entry
 * 
 * когда используем в девелопменте разные порты локалхоста, включите плагин для браузера, включающий cors
 * иначе будет ругаться на кроссдоменные запросы
 * api.entry для продакшна - /api/
 */

export default ({
    api: {
        entry: 'http://localhost:3333/api/'
    }
});
