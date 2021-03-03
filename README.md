# Employee-Tracker

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Tests](#tests)
* [Questions](#questions)
* [Process](#process)

## Description 

## Installation 

## Usage

## Credits
https://www.w3schools.com/sql/sql_join_inner.asp

## Tests

## Questions
For any questions you may have, you can reach me [via GitHub](https://github.com/Kayn-Pleiades) or [via email](mailto:kayn.pleiades@gmail.com)

## Process

### Commit 1: Initial Commit
Created repository on GitHub

### Commit 2: Base Files
Added some basic files

### Commit 3: Install Packages
Installed needed packages

### Commit 4: Set-up
I added the required packages to the script and set up the database connection. I also created the file for the database. To protect my password, I have it being pulled from a json in my homework folder. Hopefully this works to protect it!

### Commit 5: Connection
I can now connect to my database. This confirms that my password file is working too!

### Commit 6: Department
Department table is now set up! I checked it in my workbench to make sure everything looked right too! 

### Commit 7: Role
Role table is now set up! I checked it in my workbench to make sure everything looked right too! 

### Commit 8: Employee
Employee table is now also set up. I think next I'll make a seed file to help with the process moving forward. 

### Commit 9: Seed
I started a seed file to help me moving forward.

### Commit 10: Main Menu
Added a Main Menu

### Commit 11: View Departments
Added the department menu and the ability to view current departments.

### Commit 12: Menus
Put in the other two menus.

### Commit 13: View Roles
Added some roles to the seed and then added the code to view them from the menu. 

### Commit 14: View Employees
Added some employees to the seed and then added the code to view them from the menu. 

### Commit 15: Add Departments
Because the ids autoincrement, I have removed them from the seed file. Now you can add departments! I will repeat and test the process with the other two tables!

### Commit 16: What department is the role in?
Working on the add role function, I was able to use class activites to guide on how to pull the departments as a list, but now I'll need to figure out how to get the id number from the department name. 

### Commit 17: Find department id number
Using the top songs activity, I was able to figure out how to search the departments by name and then return the correct id number!

### Commit 18: Add Role
Now that I have a way to get the ID number of the department, I was easily able to set up the role addition. Now for adding employees!

### Commit 19: Is there a manager?
The prompts ask if there is a manager and then splits into two. If there is no manager, it will put the value as "" for null and then take that to an function to add the employee. If there is a manager, it will have the user select the manager from a list and then go to the add employee function. 

### Commit 20: No manager
I learned that I need to use null and not "" or "null" to set a value to null. Now employees without managers can be added.

### Commit 21: Employee with manager
Now employees that have managers can be added as well. There is a lot of added functionality I'd like to this if I have time. Like selecting a department and then only roles from that department show.

### Commit 22: Auto view
Viewing a catagory is no longer an option and the table is automatically shown while that catagory is being viewed and is shown again every time a change is made. I feel this makes much more sense from a design standpoint. 

### Commit 23: Name list
Rather than just have it update an employee's role, I figured having it be able to update any field for an employee would not be that much more work. Also, as a trans person who hopes to change their legal name soon, I think it is important for systems to allow name changes so that an employee isn't forever deadnamed by their job's system. I've made the selection list by full name, and did the same to selecting a manager. Next I'll need to change what comes after so the id can be retrieved. 

### Commit 25: Update First Name
First name can now be updated.

### Commit 26: Employee Updates
Now all aspects of employees can be updated.

### Commit 27: Single Join
I have joined the tables to that the role info shows on the table for employees, but I am still trying to figure out how to also join the info from the department table.
