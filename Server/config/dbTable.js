module.exports = {
    table: {
      user: `m_${process.env.DB_PREFIX}user`,
      activity: `m_${process.env.DB_PREFIX}activity`,
      user_permission: `m_${process.env.DB_PREFIX}user_permission`,
      division: `m_${process.env.DB_PREFIX}division`,
      permission: `m_${process.env.DB_PREFIX}permission`,
      user_activity: `o_${process.env.DB_PREFIX}user_activity`,
      competition: `o_${process.env.DB_PREFIX}competition`,
      user_competition: `o_${process.env.DB_PREFIX}user_competition`,
      event: `o_${process.env.DB_PREFIX}event`,
      winner: `o_${process.env.DB_PREFIX}winner`,
    },
  };
  