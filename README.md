
# JMP Euroleague

**JMP Euroleague** is predictor website that uses modified ELO rating system to predict chances of winning for each team based on data that is currently provided. It tracks teams **real world performance** and based on data predicts who has more chance of winning.


## About the project

It uses **MERN** Stack (MongoDB, Express.js, React, Node.js)

Some other things that are used are **Dotenv** for reading .env files and **Cloudinary** to save team logos.
Also it uses: 
- **react-dom**
- **react-icons**
- **react-router**
- **axios**
- **zustand**
- **tailwindcss**
- **daisyUI**
- **motion**
- **react-hot-toast**
- **bcryptjs**
- **cookie-parser**
- **jsonwebtoken**

### To setup .env file

```
MONGO_URI=your_mongo_uri
PORT=5000

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```


### Running the app 

First you need to build it and then just start it. These are commands:

`npm run build`

`npm run start`
