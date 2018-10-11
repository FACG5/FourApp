BEGIN;

DROP TABLE IF EXISTS users, Projects, coordination_status, project_status CASCADE;


CREATE TABLE users (
	id SERIAL UNIQUE PRIMARY KEY,
	name varchar(100) NOT NULL,
	username varchar(100) UNIQUE NOT NULL,
	pass TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	id_number integer UNIQUE NOT NULL,
	mobile integer UNIQUE NOT NULL,
	role varchar(100) NOT NULL,
	job_title varchar(30) NOT NULL
);


CREATE TABLE coordination_status (
	id serial UNIQUE NOT NULL,
	status VARCHAR(255) NOT NULL
);


CREATE TABLE project_status (
	id serial UNIQUE NOT NULL,
	status VARCHAR(255) NOT NULL
);


CREATE TABLE Projects (
	id SERIAL PRIMARY KEY, 
	sn varchar UNIQUE,
	cla_ref varchar UNIQUE NOT NULL,
	project_no varchar NOT NULL,
	project_name TEXT,
	sector varchar,
	contractor_company TEXT,
	contractor_name TEXT,
	contractor_id TEXT,
	donor TEXT,
	project_location TEXT,
	gps_x TEXT,
	gps_y TEXT,
	project_budget TEXT,
	agreement_budget TEXT,
	implementing_agency TEXT,
	uploaded_File TEXT,
	submit_date TEXT,
	approval_date TEXT,
	justification_send TEXT,
	justification_approval TEXT,
	resubmit_date TEXT,
	reapproval_date TEXT,
	coordination_status_id INTEGER,
	coordination_percentage TEXT,
	remaining_material TEXT,
	coordination_starting TEXT,
	coordination_completion TEXT,
	project_status_id INTEGER,
	project_percentage TEXT,
	project_starting TEXT,
	project_completion TEXT,
	description TEXT,
    FOREIGN KEY (coordination_status_id) REFERENCES coordination_status(id) ON DELETE CASCADE,
    FOREIGN KEY (project_status_id) REFERENCES project_status(id) ON DELETE CASCADE

);

INSERT INTO users (name, username, pass, email ,id_number ,mobile ,role ,job_title)VALUES ('Marwan Elkhoudary', 'melkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza@hotmail.com', '800640864', '0595599633', 'admin', 'Head of Department'),
('Ahmad Elkhoudary', 'Aelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza1@hotmail.com', '8006401', '0595599623', 'admin', 'Head of Department'),
('Hassan Elkhoudary', 'Helkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza2@hotmail.com', '8006642', '0595500633', 'admin', 'Head of Department'),
('Mohammed Elkhoudary', 'Moelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza3@hotmail.com', '8008643', '0595599643', 'admin', 'Head of Department'),
('Khaled Elkhoudary', 'Khelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza4@hotmail.com', '8006644', '0595599653', 'admin', 'Head of Department'),
('Othman Elkhoudary', 'Oelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza5@hotmail.com', '8006645', '0595599663', 'admin', 'Head of Department'),
('Salwa Elkhoudary', 'Selkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza6@hotmail.com', '8006646', '0595599673', 'admin', 'Head of Department'),
('Anaam Elkhoudary', 'Anaamelkhoudary', '$2a$10$b87/SM7GS1rjoFV2i8z5X.dGGQcZPW8l.fhVHxgg89GnOBAGLlf7a', 'marwangaza7@hotmail.com', '8008647', '0595599683', 'admin', 'Head of Department');




INSERT INTO coordination_status (status) VALUES('On-going'), ('Not started'), ('Completed');
INSERT INTO project_status (status) VALUES('On-going'), ('Under Design'),('Completed'), ('Un-funded'),('Suspended Due to Lack of Fund');


INSERT INTO Projects (sn, cla_ref, project_no, project_name, sector, contractor_company, contractor_name, contractor_id, donor, project_location, gps_x, gps_y, project_budget, agreement_budget, implementing_agency, uploaded_File, submit_date, approval_date, justification_send, justification_approval, resubmit_date, reapproval_date, coordination_status_id, coordination_percentage, remaining_material, coordination_starting, coordination_completion, project_status_id, project_percentage, project_starting, project_completion,
	description) VALUES('1', 'GP-10074', 'D.3.2', 'IDB Agriculture (Wells & Ponds)', 'Agriculture', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 1, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('11', 'GP-11111', 'G.3.2', 'IDB Agriculture (Wells & Ponds)', 'Agriculture', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 2, '13%', '1999', '05/04/2017', 'Still on-Going', 2, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('2', 'GP-10075', 'D.3.8', 'ABD Industrial (Wells & Ponds)', 'Industrial', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017',3, '13%', '1999', '05/04/2017', 'Still on-Going', 3, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('3', 'GP-10066', 'C.3.2', 'GGG Technology (Wells & Ponds)', 'Technology', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 1, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('4', 'GP-17777', 'B.3.2', 'IDV Educational (Wells & Ponds)', 'Educational', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 2, '13%', '1999', '05/04/2017', 'Still on-Going', 2, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('5', 'GP-15555', 'E.3.2', 'ABD Agriculture (Animals)', 'Agriculture', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 3, '13%', '1999', '05/04/2017', 'Still on-Going', 3, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('6', 'GP-18666', 'A.3.3', 'ABC Agriculture (Wells)', 'Infrastructure', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 1, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('7', 'GP-18777', 'A.3.5', 'ABD Industrial (Animals)', 'Environment', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 2, '13%', '1999', '05/04/2017', 'Still on-Going', 2, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('8', 'GP-18888', 'A.3.6', 'ABE Agriculture (Ponds)', 'Rubble', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 3, '13%', '1999', '05/04/2017', 'Still on-Going', 3, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process'),
	('9', 'GP-18999', 'A.3.7', 'ABD Technology (Animals)', 'Environment/Artificail Intelegence', 'Metito - SAK Company', 'Jawdat Al Khoudari', '922560263','Government of Japan', 'Khan Younis','5551012', '444202','200000', '400000', 'UNDP – Infrastructure','ahmad.com', 'June, 2010', '07/11/2010', '-', '-', '08/21/2016', '10/01/2017', 1, '13%', '1999', '05/04/2017', 'Still on-Going', 1, '44%', '01/22/2017', '07/21/2020', 'Approved Projects  For UNDP Infrastructure Unit, which are On-Going For Which Coordination are in-Process');

COMMIT;
