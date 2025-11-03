INSERT INTO `govos.officers` (user_id, name, status)
VALUES
  ('rahul@maha.gov', 'Rahul Patil', 'ACTIVE'),
  ('asha@maha.gov', 'Asha Kulkarni', 'ACTIVE');

INSERT INTO `govos.roles` (role_id, role_name, capabilities)
VALUES
  ('district_commissioner', 'District Commissioner', ['READ_TICKETS', 'VIEW_AGG']),
  ('ward_officer', 'Ward Officer', ['READ_TICKETS', 'WRITE_RECOMMENDATIONS']);

INSERT INTO `govos.user_roles` (user_id, role_id)
VALUES
  ('rahul@maha.gov', 'district_commissioner'),
  ('asha@maha.gov', 'ward_officer');

INSERT INTO `govos.postings` (user_id, entity_id)
VALUES
  ('rahul@maha.gov', 'district_pune'),
  ('asha@maha.gov', 'ward_12');
