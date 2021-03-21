# QUIZ GAME

Create ssl certificate:
```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

Start http server by npx
```
npx http-server -S -C cert.pem
```

Enjoy your game! :-)