# news-articles-listing


# This project was bootstrapped from scratch using
1. ESbuild
2. Typescript
3. ReactJS
4. dotenv

# If you do not want to run into hassle of setting this up in your local, Please [visit this netlify link](https://main--newslisting.netlify.app/).
This below badge shows latest status of the deployment done by the developer.
[![Netlify Status](https://api.netlify.com/api/v1/badges/16452711-aa6d-4e8d-90c3-c834a4c75fdb/deploy-status?branch=main)](https://app.netlify.com/sites/newslisting/deploys)

# But if you want to run it locally, here are the standard steps

1. Run `npm install`
2. Add .env.local file into the root directory of the project
3. Add this env values to the file
`
NODE_ENV=development
REACT_APP_API_URL=https://dummy-rest-api.specbee.site
`
4. Run `npm start` -> Starts project on [localhost:8000](https://localhost:8000) with HMR enabled.
    a. Refreshes page on any file change
    b. Refreshes automiaticlly Except when the error is already occured in the browser. In this case, try to refresh manually and then it starts working as is.
5. If you want to build for production env, run `npm run build`
