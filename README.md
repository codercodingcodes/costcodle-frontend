To launch:
instructions avaliable at https://discord.com/developers/docs/activities/building-an-activity
Launch in localhost : npm run dev
Launch clounflare tunnel: cloudflared tunnel --url http://localhost:5173
Edit activity url mappings in discord developer portal to cloudflare url

#TODO
forgor comments
Front end
-add more UI improvements
    -add animation whenever a guess is submitted
    -add current guess counter
    -improve stat screen
        -more detailed stats
        -gray out non stat areas upon toggle
        -improve look of exit button
    -improve header
        -make info and stat button more obvious
-add info screen
    -toggleable similiar to stat screen
-add minimization icon
    -when you minimize the game, make it so that it displays a little icon instead of the webpage

Backend
-fix backend mechanics
    -currently, how the game retrieves previous stats is by comparing guesses to the price and if it close enough and within the guess limit then it counts as a win
        -THIS SUCKS
        -ideally we want to store a game_completed column where it indicates that a user has beaten the game that day
    -currently, how we retrieve the stats of everyone who is in your channel is by storing the last channel that the user has guessed in and seeing if it matches the current channel
        -THIS SUCKS
        -ideally we want to retrieve all userIDs in the current channel via the discord sdk and just get the stats of the users for the current game
    -security stuff
        -there needs to be input sanitization and cross origin request rules
        -not a huge priority cuz discord kinda obfuscates the endpoints and has some built in security (i think?) so whatever plus its a browser game so who cares really