USE employee_db;

INSERT INTO department (department_name)
VALUES ("sales"),
       ("FOH"),
       ("BOH");

INSERT INTO role (title, salary, department_id)
VALUES ("sales", 15000, 1),
       ("cook", 20000, 3),
       ("bar", 25000, 2),
       ("server", 20000, 2),
       ("host", 10000,2);
       
INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES ("joe", "smith", 1, NULL),
       ("john", "hayes", 3, NULL),
       ("sam", "watne", 2, 2),
       ("mike", "mccoy", 2, 1),
       ("bob", "wayne", 4, 1),
       ("jamie", "lund", 5, 2);