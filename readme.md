# Sprint 8 project

## Urban Routes
This project includes automated testing for the Urban Routes web app, which allows a user to order a taxi online. In the automation testing, I scripted my test to move through each "field" of fillable fields that are required in order to successfully place an order.

### Technologies and Techniques used
Visual Studio Code: Code editor
Node.js: JavaScript runtime environment
Git: Version control system
WebdriverIO: Automation testing framework
Devtools:

#### Instruction how to run the tests:
1. Clone the repo to your local computer git clone https://github.com/username/hm08-qa-us.git. Replace username with your Github username.
2. Change your current directory to the project folder: cd hm08-qa-us. 
3. Run the npm install from the console in your project folder. 
4. Replace the API URL with the unique link generated after the launch of Urban Routes server in the wdio.conf.js file.
5. Run tests with npm run wdio

##### Test Scenarios Covered
1. Setting the address
2. Selecting Supportive plan
3. Filling in the phone number
4. Adding a credit card
5. Writing a message for the driver
6. Ordering a Blanket and handkerchiefs
7. Ordering 2 Ice creams
8. The car search modal appears
9. Order info appears in the modal
