### Instructions 
# clone the project 
# go to it's root directory
# npm run install <!-- to install dependencies -->
# npm run dev <!-- to run the project -->
# replace your key to .env file
# Here i am using open router api keys for open ai because its free
# but because of limitation i am getting belows error which is completely normal

{
  error: {
    message: 'More credits are required to run this request. 16384 token capacity required, 4000 available. To increase, visit https://openrouter.ai/settings/credits and upgrade to a paid account',
    code: 402
  }
}


### if you want to use paid openai api key just /api/openai-api.ts instead of /api/open-router.ts 
### this is mentioned as i developed my code with openrouter api keys
### because its free so most of the time it exists the token 
### but it should work for openai paid API and belows code will perfectly work with it 
