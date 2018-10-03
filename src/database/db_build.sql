BEGIN;

DROP TABLE IF EXISTS users, Projects, coordination_status, project_status CASCADE;


CREATE TABLE users (
	Id SERIAL UNIQUE PRIMARY KEY,
	name varchar(100) NOT NULL,
	username varchar(100) UNIQUE NOT NULL,
	pass TEXT NOT NULL,
	Email TEXT UNIQUE NOT NULL,
	id_number integer UNIQUE NOT NULL,
	mobile integer UNIQUE NOT NULL,
	role varchar(100) NOT NULL,
	job_title varchar(30) NOT NULL
);


CREATE TABLE coordination_status (
	id serial UNIQUE PRIMARY KEY,
	status VARCHAR(255) NOT NULL
);


CREATE TABLE project_status (
	id serial UNIQUE PRIMARY KEY,
	status VARCHAR(255) NOT NULL
);



CREATE TABLE Projects (
	sn varchar NOT NULL,
	cla_ref varchar NOT NULL,
	project_no varchar NOT NULL,
	project_name TEXT NOT NULL,
	sector text NOT NULL,
	contractor_company TEXT NOT NULL,
	contractor_name TEXT NOT NULL,
	contractor_id integer NOT NULL,
	donor TEXT NOT NULL,
	project_location TEXT NOT NULL,
	gps_x integer NOT NULL,
	gps_y integer NOT NULL,
	project_budget integer NOT NULL,
	agreement_budget integer NOT NULL,
	implementing_agency TEXT NOT NULL,
	submit_date text NOT NULL,
	approval_date TEXT NOT NULL,
	justification_send text NOT NULL,
	justification_approval text NOT NULL,
	resubmit_date text NOT NULL,
	reapproval_date text NOT NULL,
	coordination_status_id integer NOT NULL,
	coordination_percentage text NOT NULL,
	remaining_material integer NOT NULL,
	coordination_starting text NOT NULL,
	coordination_completion text NOT NULL,
	project_status_id integer NOT NULL,
	project_percentage text NOT NULL,
	project_starting text NOT NULL,
	project_completion text NOT NULL,
	description TEXT NOT NULL,
    FOREIGN KEY (coordination_status_id) REFERENCES coordination_status(id) ON DELETE CASCADE,
    FOREIGN KEY (project_status_id) REFERENCES project_status(id) ON DELETE CASCADE,
	FOREIGN KEY (sector_id) REFERENCES sectors(id) ON DELETE CASCADE

);

Insert INTO users (name, username, pass, email ,id_number ,mobile ,role ,job_title)VALUES ('Marwan Elkhoudary', 'melkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Ahmad Elkhoudary', 'Aelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Hassan Elkhoudary', 'Helkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Mohammed Elkhoudary', 'Moelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Khaled Elkhoudary', 'Khelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Othman Elkhoudary', 'Oelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Salwa Elkhoudary', 'Selkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Anaam Elkhoudary', 'Anaamelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department');




Insert INTO coordination_status (status) VALUES('On-going'), ('Not started'), ('Completed');
Insert INTO project_status (status) VALUES('On-going'), ('Under Design'),('Completed'), ('Un-funded'),('Suspended
Due to Lack of Fund');


Insert INTO Projects (sn, cla_ref, project_no, project_name, sector, contractor_company, contractor_name, contractor_id, donor, project_location, gps_x, gps_y, project_budget, agreement_budget, implementing_agency, submit_date, approval_date, justification_send, justification_approval, resubmit_date, reapproval_date, coordination_status_id, coordination_percentage, remaining_material, coordination_starting, coordination_completion, project_status_id, project_percentage, project_starting, project_completion,
	description) VALUES('1', 'GP-10074', 'D.3.2', 'IDB Agriculture (Wells & Ponds)', 'Agriculture', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 1, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('1', 'GP-11111', 'G.3.2', 'IDB Agriculture (Wells & Ponds)', 'Agriculture', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 2, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('2', 'GP-10055', 'D.3.8', 'ABD Industrial (Wells & Ponds)', 'Industrial', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 3, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('3', 'GP-10066', 'C.3.2', 'GGG Technology (Wells & Ponds)', 'Technology', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 1, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('4', 'GP-17777', 'B.3.2', 'VVV Educational (Wells & Ponds)', 'Educational', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 2, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('5', 'GP-18888', 'A.3.2', 'ABD Agriculture (Animals)', 'Agriculture', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 3, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process');

COMMIT;
