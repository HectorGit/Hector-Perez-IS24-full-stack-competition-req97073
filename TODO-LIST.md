# PROGRESS TRACKING on the PROGRESS TRACKER

## BASE REQUIREMENTS

### 1 - See a list of all products 
- pending : touch up the dummy data to create more groupings of projects that same developer or same scrum master participated in

### 2 - Able to add a product : 
implemented

### 3 - Able to edit an existing product : 
implemented

-pending : for the add and edit forms, choose correct input type to make data entry easier, as well as data handling in the backend
-pending : for the add and edit forms, add validation on input data (e.g. < 5 developers, only agile and waterfall, etc.)

-----------------------------------------------------------------------------------------------------------------------------------

## BONUSES 

### A- Filter by scrum master. (right now specific scrum master hardcoded)
implemented 

### B- Filter by developer. (right now specific developer hardcoded)
pending frontend (although it probably will be similar to the above)

### C- Swagger documentation of the endpoints
pending

-----------------------------------------------------------------------------------------------------------------------------------

## OTHER 

### Thoughts : 
turn the productsPage (currently a function) into a react component to use lifecycle method to load data on component load
update readme before submitting

### Future optimizations : 
redux to cache the data, and actual database (?)