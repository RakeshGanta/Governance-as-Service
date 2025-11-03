-- Pass 1: roots
UPDATE `govos.entities`
SET path = CONCAT('/', entity_id)
WHERE parent_id IS NULL;

-- Pass 2: direct children
UPDATE `govos.entities` AS child
SET path = CONCAT(parent.path, '/', child.entity_id)
FROM `govos.entities` AS parent
WHERE child.parent_id = parent.entity_id
  AND child.path IS NULL;

-- Pass 3: ensure grandchildren filled
UPDATE `govos.entities` AS child
SET path = CONCAT(parent.path, '/', child.entity_id)
FROM `govos.entities` AS parent
WHERE child.parent_id = parent.entity_id
  AND child.path NOT LIKE CONCAT(parent.path, '/%');
