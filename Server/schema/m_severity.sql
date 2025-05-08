CREATE TABLE m_severity (
    fid INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(255),
    fdesc VARCHAR(255),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN DEFAULT 0

    PRIMARY KEY(fid)
)

-- INSERT INTO m_severity (fname, fdesc, created_by) 
-- 	VALUES 
-- 		('OK', 'Parameter masih ok', '1629083'),
-- 		('NG', 'Parameter tidak bagus', '1629083')