# shoppingify  

### [live](https://shoppingify-frontend.onrender.com)
### [backend](https://github.com/robZuk/shoppingify-backend.git)

![shoppingiffy](https://user-images.githubusercontent.com/40764780/217834692-4b104c6a-82ac-46d0-9f1c-3d7ae1b5298c.png)


### Technologies
- React 18
- React Router 6
- React Redux
- React Hook Form 7
- Bootstrap 5
- styled components 5
- MongoDB
- Express 4



### Features

- Full featured shopping cart
- Car search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- PayPal integration

### Env Variables
Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)
```
npm install
cd frontend
npm install
```
### Run
```
Run frontend (:3000) & backend (:5000)
npm run dev

Run backend only
npm run server
```

Seed Database
You can use the following commands to seed the database with some sample users and products as well as destroy all data

### Import data
```
npm run data:import
```

### Destroy data
```
npm run data:destroy
```
### Admin Panel
```
user: admin@example.com
password: 123456
```
