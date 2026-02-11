-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  type TEXT NOT NULL CHECK (type IN ('digital', 'physical')),
  stock_quantity INTEGER CHECK (stock_quantity >= 0),
  image_url TEXT NOT NULL,
  watermarked_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artworks_type ON artworks(type);
CREATE INDEX IF NOT EXISTS idx_artworks_is_active ON artworks(is_active);
CREATE INDEX IF NOT EXISTS idx_artworks_category ON artworks(category);
CREATE INDEX IF NOT EXISTS idx_artworks_is_featured ON artworks(is_featured);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Public can read active artworks (no auth required)
CREATE POLICY "Anyone can view active artworks"
  ON artworks FOR SELECT
  USING (is_active = true);

-- Authenticated admin can do everything
CREATE POLICY "Admins can insert artworks"
  ON artworks FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update artworks"
  ON artworks FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete artworks"
  ON artworks FOR DELETE
  USING (auth.uid() IS NOT NULL);
