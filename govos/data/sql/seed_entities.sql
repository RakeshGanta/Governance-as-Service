INSERT INTO `govos.entities` (entity_id, parent_id, entity_type, name, path)
VALUES
  ('state_maha', NULL, 'state', 'Maharashtra', NULL),
  ('district_pune', 'state_maha', 'district', 'Pune District', NULL),
  ('ward_11', 'district_pune', 'ward', 'Ward 11', NULL),
  ('ward_12', 'district_pune', 'ward', 'Ward 12', NULL),
  ('ward12_sanitation', 'ward_12', 'office', 'Ward 12 Sanitation Office', NULL);
