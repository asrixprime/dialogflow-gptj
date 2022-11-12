# dialogflow and GPT3 Integration
API written using nodejs for GPT3 connection with Dialogflow.

## Steps to install on Windows:
1) If using anaconda use following command to install nodje and npm in ve
```
conda create -n nodejs-env nodejs 
```

2) Clone the following repo with all the dependencies:
```
git clone https://github.com/abuelgasimsaadeldin/dialogflow-gpt3.git  
```

3) Create .env file and place following: 
```
OPENAI_API_KEY=""
```

4) Install the dependencies:
```
npm install
```

5) Run the API:
```
node dialogflowgpt3.js
```

6) Use ngrok to make localhost public
```
ngrok http 3000
```
