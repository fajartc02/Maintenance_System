CREATE TABLE m_machine_parameter (
    fid INT NOT NULL AUTO_INCREMENT,
    id_m_machine INT NOT NULL,
    id_m_parameter INT NOT NULL

    PRIMARY KEY(fid),

    FOREIGN KEY (id_m_parameter)
      REFERENCES m_parameter(fid)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (id_m_machine)
      REFERENCES tb_mc(fid)
      ON UPDATE CASCADE ON DELETE RESTRICT
)