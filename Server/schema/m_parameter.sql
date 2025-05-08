CREATE TABLE m_parameter (
    fid INT NOT NULL AUTO_INCREMENT,
    mc_id INT NOT NULL,
    treshold_id INT NOT NULL,
    name VARCHAR(255),
    methode_check VARCHAR(100),
    max_value FLOAT,
    min_value FLOAT,
    total_mp TINYINT,
    std_duration INT,
    units VARCHAR(50),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN DEFAULT 0

    PRIMARY KEY(fid),
    INDEX (name),
    INDEX (mc_id),

    FOREIGN KEY (mc_id)
      REFERENCES tb_mc(id)
      ON UPDATE CASCADE ON DELETE RESTRICT
    FOREIGN KEY (treshold_id)
      REFERENCES m_treshold(fid)
      ON UPDATE CASCADE ON DELETE RESTRICT
)