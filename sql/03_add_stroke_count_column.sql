ALTER TABLE rooms ADD stroke_count bigint(20) NOT NULL DEFAULT 0 AFTER name;
ALTER TABLE rooms ADD INDEX count_idx(stroke_count);
