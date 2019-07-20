# Mongoose-Cheerio-News

This app has scraped the legislators from the Hawaii Legislature website, and displays the name, link and phone number for the user to contact regarding an important community matter. 

In addition, the app allows the user to comment on the legislator which is stored and displayed at a later time.  The user is also able to delete comments with a button. 

## Technology
Scrapping is done through Cheerios, a node package. Duplicate entries are prevented through javascript code. 

The comments are saved to the database through Robo 3T.  The comments and legislator are linked to each other with