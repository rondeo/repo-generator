/**
 * Global Variables
 */
const automate = require("guide-automation");
const guide = automate({ spinner: true, log: true });
const fs = require('fs-extra');
const inquirer = require('inquirer');
let tempFolder;


/**
 * User Input
 */
guide.step("Create temporary directory", function(){
    return inquirer.prompt([
        {
            name: 'guideName',
            message: 'Please enter guide name',
            default: 'temp'
        },
      ]).then((answers) => {
          if(answers.guideName !== 'temp') {
              tempFolder = 'temp' + '-' + answers.guideName;
          } else {
              tempFolder = answers.guideName;
          }
          return fs.mkdirs(tempFolder).then(() => {

              console.log(`Congrats you created directory ${tempFolder}.`);
          }).catch(() => {
              console.error(err);
          });
      });
});


/**
 * Install Necessary packages
 */
guide.step("Install angular cli", function(){
    return guide.executeCommand("npm", ["ls", "-g", "@angular/cli@7"]);
});


/**
 * Initial Project setup
 */
guide.step("Create a new angular workspace", function(){
    return guide.executeCommand("ng", ["new", "place-my-order", "--prefix pmo"])
});

guide.step("Move angular workspace into " + tempFolder + " directory", function(){
     var srcDirectory = __dirname + '/place-my-order';
     var targetDirectory = __dirname + '/' + tempFolder + '/' + '/place-my-order';

    return fs.move(srcDirectory, targetDirectory).then(() => {
        console.log(`
            You have successfully transferred the files from ${srcDirectory}
            into ${targetDirectory}`);
     }).catch(err => {
       console.error(err);
     });
});


/**
 * Run the test
 */
guide.run().then(
	function(){
		console.log("All done!");
		return 0;
	},
	function(err){
		console.error("Oh no", err.message, err.stack, err);
		return 1;
	}
).then(function(exitCode){
	console.log("Exiting", exitCode);
	process.exit(exitCode);
});
