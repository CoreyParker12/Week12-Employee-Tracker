use cmsDB; 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Corey", "Parker", 4, 6), ("Sam", "Adams", 8, 1), 
("Vanilla", "Ice", 7, 6), ("Foo", "Barr", 1, 3),
("James", "Potter", 5, 8), ("Tony", "Stark", 2, null),
("Peter", "Parker", 3, 8), ("Tom", "Brady", 6, 2);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Customer Service"), ("Admin");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 80000, 3), ("CEO", 1000000, 5), ("Customer Service Rep", 40000, 4), ("Electrical Engineer", 110000, 2),
("Head Developer", 150000, 2), ("Sales Rep", 500000, 1), ("Sales Lead", 90000, 1), ("Mechanical Engineer", 100000, 2);