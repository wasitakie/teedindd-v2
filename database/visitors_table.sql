-- สร้างตาราง visitors สำหรับเก็บข้อมูลผู้เข้าชมเว็บไซต์
CREATE TABLE IF NOT EXISTS visitors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  path VARCHAR(500) NOT NULL DEFAULT '/',
  referer VARCHAR(500) DEFAULT '',
  user_agent TEXT,
  ip_address VARCHAR(45) NOT NULL,
  visited_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_visited_at (visited_at),
  INDEX idx_path (path(255)),
  INDEX idx_ip (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
