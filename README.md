

# RetroHunt

RetroHunt is a cross-platform application created using React Native. This mobile application is named ‘RetroHunt’ and is our proposition for an online community-driven video game exchange platform, allowing users to buy older games within their local area with relative ease through either delivery or in-person exchange.

**The following project was created in a group as part of a university assignment. I was the leading app developer for this project, with additional contributions from other team members.**

## Screenshots
![RetroHunt](https://raw.githubusercontent.com/ParaMahalingam/RetroHunt/main/Screenshots/combined.png )

	More screenshots are inside the "Screenshots" folder.

**Accounts for testing:**

	Username: Admin
	Password: admin123@

	Username: John
	Password: john123@

	Username: Mark
	Password: mark123@

## Authors
- Para Mahalingam
- Dirosan Sivarajah
- Sulaiman Khan

## Prerequisites
[Node.js](https://nodejs.org/en/)

[Expo CLI](https://docs.expo.dev/get-started/installation/)
## Installation
Make sure Git is installed on your computer to run the git command, or simply download the zip file and then extract it.
1. Get the code

    ```bash
    git clone https://github.com/ParaMahalingam/RetroHunt.git
    
    cd RetroHunt
    ```
2. Install dependencies (App)
    ```bash
    npm install
    ```
3. In a terminal, run (To run the App)
    ```bash
    npm start
    ```
4. Install dependencies (Backend) (Optional)
This step is **optional**, and this step is only required if you wish to run the backend API locally. The App is predefined to use the remote server for the Backend API. The URL for the Backend API is defined inside the App.js file of the app source code.
In a separate terminal, run
    ```bash
    #Change the working directory to RetroHunt and then change again to Backend
    cd RetroHunt
    cd Backend
    npm install
    ```

5. In the terminal, run (To start the backend server)
    ```bash
    npm start
    ```

6. Update the Backend API URL
Find out the **LAN IP address** (ex 192.168.1.10, 10.0.0.1) of the computer and then specify it inside the App.js file located inside App's source code (global.API_URL).
To find out the LAN IP address of the computer which you are using, open CMD and then run the following command:
    ```bash
    ipconfig
    ```
