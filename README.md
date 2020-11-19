# Rise To The Top

### Introduction
Welcome to Rise to the Top!

This app will help with psychology research to investigate the impact of social hierarchies within groups. The clients already have code that works in local computers that participants can play in their labs. However, because of COVID, they are hoping to make it accessible to people online.

There are two games that are encompassed within our web application.
The first is a simple game that focuses on forming social groups. In simple terms, the game logic is as follows. Six players start out on an even playing field, with the same level of status. Then, in an iterative process, players simply choose other players that they want to give status to, elevating their ranking within the game. There will be bonuses for “teamwork” such that two or three players who choose each other will be granted an elevated raise to their ranking. After a certain period, this game will end, and the three highest players will form one group, while the lowest three will form another.
Secondly, the two teams will then compete with one another. There will be another iterative process, wherein each player will have a certain number of tokens that they can either invest, keep, or compete with. Investing will convert their money and give it to teammates at a positive exchange rate. Keeping money will allow it to be accessible at a later turn. Competing will convert money and lower the opposing team's bankroll.
At the end of the game, the user's choices and initial ranking will be stored in a database to explore the mechanisms behind social groupings and hierarchies.

### Dependencies ps://rise-to-the-top.herokuapp.com/)

Libraries/frameworks used:
	•	React: MIT License
	•	Node.js: MIT License
	•	Express: MIT License
	•	Socket.io: MIT License
	•	Mongoose: MIT License
	•	Mocha: MIT License
	•	Axios: MIT License
	•	Moment: MIT License

### Installation

For deployment, contact eric.doppelt@duke.edu to gain access to this project’s repository:
1. Clone from Git to local machine
	Run git clone https://github.com/ericdoppelt/psych-games
2. In terminal, using command cd, open the psych-games directory on local machine
3. *Important* Before running application, install node modules and dependencies (backend)
	Run npm install
4. *Important* Before running application, install node modules and dependencies (frontend)
	Run cd frontend
	Run npm install
3. Run application
	Run cd frontend
	Run `npm start`, open your browser and go to [http://localhost:3001/](http://localhost:3000/)
