-- Atomic stock decrement to prevent overselling
CREATE OR REPLACE FUNCTION decrement_stock(p_artwork_id UUID, p_quantity INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE artworks
  SET stock_quantity = stock_quantity - p_quantity,
      updated_at = NOW()
  WHERE id = p_artwork_id
    AND stock_quantity >= p_quantity
    AND type = 'physical';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for artwork %', p_artwork_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
