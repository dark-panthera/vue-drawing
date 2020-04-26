# Draw

## Project: Vue Drawing App
```
npm install
yarn install
```

### Hot Reload
```
npm run serve
yarn serve
```

### Server Side Rendering
```
npm run start
yarn start
```

### Server Side Rendering
```
The port is on 9000
http://localhost:9000/index.html
```

### Run Build
```
npm run build
yarn run build
```

### Features
```
Enables the User to upload Image from Drawing Page
It will broadcast images and mouse drag event
Any feature broadcasted will be presented in Preview Page.

Whenever clicking on Preview Page it will be displayed in another tab.

The app is making use of socket.IO which tends to be more stable when transmitting data to websocket. It enables broadcasting which disables to transimite to the same page / user.

The app is also making use of P5-vue plugin which it enables the developer to create a drawing app with canvas.
```
