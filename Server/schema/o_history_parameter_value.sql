CREATE TABLE o_history_parameter_value (
    fid INT NOT NULL AUTO_INCREMENT,
    id_m_parameter INT NOT NULL,
    id_m_severity INT NOT NULL,
    clock TIMESTAMP,
    value FLOAT,

    PRIMARY KEY(fid),

    FOREIGN KEY (id_m_severity)
      REFERENCES m_severity(fid)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (id_m_parameter)
      REFERENCES m_parameter(fid)
      ON UPDATE CASCADE ON DELETE RESTRICT
)