# Getting Started with Create React App

URL - https://sevanandyadav.github.io/sevanand-cv/

## Steps To Setup AND DEPLOY
# local 
    npm start

# to deploy on githib pages 
Commit and push to GitHub:
    git add .
    git commit -m "Updated content"
    git push origin main

Rebuild the production bundle:
    npm run build   
Push the new build folder to gh-pages branch:
    git subtree push --prefix build origin gh-pages