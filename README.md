
# Symposium

On a general basis, many students or parents have queries regarding admission, fee structure, techfests,  culturals,
guidance and many more doubts which they dont have any good enough trusted guide to help in this matter. Symposium provides a common plateform where 
IITB or non IITB people can ask their queries, search for related questions and can find the solutions which are provided by the verified IITB users ,thus reducing the misinformation regarding the query asked. 
Other users can vote the answers if found useful and the interface will give preferences to answers on the basis of 
their votes so that it is easier to filter best answer.
Some really useful question can be upvoted and questions can be displayed on the
basis of votes, views and number of answers, so that IITB users can answer to most demanding questions. 
Then it will be really helpful to lot of help seeking people having great dreams and determination to get admission at 
IIT Bombay or make use of their knowledge to get on the right path. Also to others to get basic information about general events.

## Sell your Product/Service

Resolve your queries regarding IIT Bombay life style and academics and get replied from trusted users


## Features

- login with registered id and correct password
- sign up with valid and unused email id and matching an alteast 6 length password with re-password
- display all the questions at one place with the following details:
	- all the tags associated with the question
	- author name
	- time at which it has been asked.
	- number of views
	- number of votes
	- number of answers

- display of all tags together alongwith their count values
- sorting of questions based on 
	- views
    - votes
    - number of answers
- each questions are a clickable link, which when clicked by a logged in user will open a seperate page where all the relevant details 
	- related to that question only will be shown , there we can upvote that question (one user can upvote atmost one time), 
	- if we visit this page then our view will also be count, but for the first time only, 
	- if user is from iitb then only he/she is  authorized to post the answer.
	- If a user who is not loggedin will be redirected to login page
- one can upvote the answers(atmost one time) and answers are sorted based on the number of upvotes
- with each answers author of the answer will be shown and the time and date at which it has been posted will be displayed
- searching of the questions and sorting the results of search based on: 
	- upvotes count
	- views count
	- number of answers
- Search feature is a dynamic implementation. While searching, the results will keep on changing based on our query string dynamically while typing.
- anyone can post the question and there are validations to the tag that atleast one tag have to be attached and atmost 5 tags can be given to the question



## Tech Stack

- **Html Css Bootstrap**
- Reactjs
- Nodejs
- **Database and Networking** (MongoDB and Mongoose)
- Expressjs
- json WebToken
- cookies
- **latex**
- **Documentation** (jsDoc)
- **Git and MarkDown**

## Deliverables

- [x] User authetication : login-signup page
- [x] Question answer forum
- [x] Sorting question-answers by some measure(most viewed/liked)
- [x] Only verified users can reply to the question. Question can be posted by any user


## Hardware/Software Requirements :
- Computer with working internet
- MongoDb account (If want to use personal database) and uri provided by the mongodb
- Code Editor (example: Visual Studio Code)


  
## How to operate

Clone the project

```bash
  git clone https://github.com/CS699-IITB-Autumn-2021/project-akashhrishimanal.git
```

Go to the project directory

```bash
  cd project-akashhrishimanal
```

Install dependencies

	       
Inside the client:
	       
```bash
  cd Client
  npm install
  npm install bootstrap
```
For Documentation 
```bash
  npm install -D jsdoc
  npm run doc
```

Inside the server: 

```bash
  cd Server
  npm install
  npm install moment
  npm run server
```
For Documentation 
```bash
  npm install -D jsdoc
  npm run doc
```

Start the client

```bash
  npm start
```

Start the server

```bash
  npm run server
```

##Primary stakeholders of the product/service built :
Primary stakeholders of this project is mainly for the institutes like IITB who can use this project to create their personal forum

## Team details along with the contribution.

**[Akash](https://github.com/techtoearth)**
Contribution:
- [post answer]
- [verified users can post ans]
- [Real Time searching of questions]
- [sorting of questions]
- [display of answers]

**[Hrishi](https://github.com/Hrishi0000)**
Contribution
- [user authentication -login/signup]
- [views count]
- [posting questions]
- [likes to questions and answers]

**[Manal](https://github.com/manaljain6667)**
Contribution
- [Designing of web Pages]
- [creating and rendering tags]
- [Real Time searching of questions]
- [rendering all the details of the question after clicking it]




## Path to Code Documentation (index.html)
- for client : ./Documentation/Client/index.html
- for server : ./Documentation/Server/index.html
