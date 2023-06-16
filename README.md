# fifa-tracker
FIFA World Cup tracking app, with Fixture and Leaderboard tracking.

A web app to keep track of FIFA World Cup. It has routes to 3 pages: 'Schedule' (past & upcoming fixtures), 'Leaderboard' which contains logic to tackle rankings when different teams have equal scores, and 'Error404' route which would be mounted for any route other than the first 2.

Used 'json fake server' to fetch the data from.
Use the following command to run the server:
<i>npx json-fake-server -m dev-mock-server-config.json</i>
