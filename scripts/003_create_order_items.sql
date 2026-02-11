-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES artworks(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  artwork_title TEXT NOT NULL,
  artwork_type TEXT NOT NULL,
  download_url TEXT,
  download_count INTEGER DEFAULT 0,
  download_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Admins can view order items
CREATE POLICY "Admins can view order items"
  ON order_items FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Service role can insert order items (webhook)
CREATE POLICY "Service can insert order items"
  ON order_items FOR INSERT
  WITH CHECK (true);
