CREATE TABLE m_treshold_parameter (
    fid INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(255),
    fdesc VARCHAR(255),
    rule VARCHAR(255),
    duration INT,
    id_m_severity INT NOT NULL,
    id_m_parameter INT NOT NULL,

    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN DEFAULT 0,

    PRIMARY KEY(fid),

    FOREIGN KEY (id_m_severity)
      REFERENCES m_severity(fid)
      ON UPDATE CASCADE ON DELETE RESTRICT
    FOREIGN KEY (id_m_parameter)
      REFERENCES m_parameter(fid)
      ON UPDATE CASCADE ON DELETE RESTRICT
)

-- INSERT INTO m_treshold_parameter(fname, fdesc, rule, duration, id_m_severity, created_by) 
-- 	VALUES 
-- 		('vibration OK', 'Jika vibrasi < 1.8 mm/s', 'x < 1.8', 0, 1, '1629083'),
-- 		('vibration NG', 'Jika vibrasi > 7.1 mm/s', 'x > 7.1', 0, 2, '1629083'),
-- 		('vibration Warning', 'Jika vibrasi 2.8 => x <= 4.5', 'x >= 2.8 && x <= 4.5', 0, 3, '1629083')