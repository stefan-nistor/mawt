### Managing water turbines on the Web (MaWT) - Web Technologies final project Summer 2022

Develop a Web system for hydropower management: from the optimal location of hydropower turbines according to efficiency, soil, risk minimization and other factors to the visualization of the status and real-time monitoring of each turbine and the achievement of statistics on the degree of functionality , efficiency, depending on water flow, weather and wear conditions (for example, temporary shutdown in case of drought or for repairs - planned or not). Based on its own REST / GraphQL API, both numerical information and suggestive views will be provided. The current status of the plant can also be consulted through RSS data feeds. Any exceptional situation will be reported immediately by e-mail and via notifications directly in the Web browser.

### Prerequisites - Tools
* Visual Studio Code or other text editor / IDE
* NodeJs - 8.15.0 or later
* NodePackageManager (npm) - 6.4.0 or later
* Python3
* Live Server plugin


### How to run
* Clone the repository on your machine
* Open a terminal in `/backend` folder and run `npm i`. This will install all nedded dependencies
* Run `hp-data-importer.py` script after editing it with desiered CSV file path (this operation should be completed once)
* Run `npm start` or `npm run dev` (to start the server with `nodemon`) in  `/backend` folder to start backend server
* Right-click on a `.html` page form `/frontend/views` and select `Open with Live Server` for Visual Studio Code, or use any plugin that allows you to view html files live.
