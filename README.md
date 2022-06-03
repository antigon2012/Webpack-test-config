## Для работы данных команд Вам потребуется любая установленная версия Nodejs

npm init (инициализация каждого проекта)
npm init -y (флаг -у позволяет пропустить весь перечень задаваемых вопросов и сразу создать файл package.json)

npm install webpack webpack-cli -save-dev (install можно сократить до i, -save-dev также можно сократить до -D)
npx init webpack (инициализирует Webpack и выкатывает перечень вопросов, отвечая на которые Вы ставите то с чем в
дальнейшем будете работать)

Что касаемо запуска скриптов запускаемых из файла package.json

```
    "start": "cross-env NODE_ENV=development webpack-dev-server --mode development", @@@ npm start @@@ - запускает сервер (аналогично LiveServer) (Останавливается путем нажатия ктрл + с)
    "dev": "cross-env NODE_ENV=development webpack --mode development", @@@ npm run dev @@@ - собирает проект в девелопмент режиме, т.е. Ваш код не будет минифицирован
    "build": "cross-env NODE_ENV=production webpack --mode production", @@@ npm run build @@@ - собирает проект в девелопмент режиме, т.е. Ваш код не будет минифицирован
    "deploy": "gh-pages -d dist", @@@@ npm run debloy @@@ - После сборки проекта (при появлении папки dist) пушит её содержимое на gh-pages 
    "clean": "rd /s /q dist" @@@ npm run clean @@@ - просто удобный скрипт для удаление папки dist 
```



| npm              | actions            |
|------------------|--------------------|
| `npm install`    | install            |
| `npm start`  | development dev-server |
| `npm run build`  | production         |
| `npm run deploy` | deploy gh-pages    |
| `npm run dev`    | development        |

Попробовать запустить скрипты можно из консоли Вашего редактора, либо при наведении на них в файле package.json

