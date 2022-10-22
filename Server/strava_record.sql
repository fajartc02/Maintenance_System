select
    mfdu.noreg as noreg,
    mfdu.name as name,
    mfdd.`name` as division_name,
    IF(mfdu.is_male = 1, "Male", "Female") as gender,
    IF(mfdu.is_family = 1, "Keluarga", "Karyawan") as status_karyawan,
    mfdu.weight as weight,
    mfdu.age as age,
    mfdu.phone_number as phone_number,
    mfdu.email as email,
    mfdu.strava_id as strava_id,
    ofduc.is_disqualified,
    ofdc.id as id_competition,
    ofdc.name as competition_name,
    ofdcat.id as id_category,
    ofdcat.name as category_name,
    ofdusa.*,
    FROM_UNIXTIME(ofdusa.start_date / 1000) as human_start_date,
    FROM_UNIXTIME(
        (ofdusa.start_date + ofdusa.moving_time * 1000) / 1000
    ) as human_end_date
from
    o_family_day_user_competition_category ofduc
    JOIN m_family_day_user mfdu ON ofduc.id_user = mfdu.id
    JOIN o_family_day_competition ofdc ON ofduc.id_competition = ofdc.id
    JOIN o_family_day_category ofdcat ON ofduc.id_category = ofdcat.id
    JOIN o_family_day_user_strava_activity ofdusa ON ofdusa.id_strava = mfdu.strava_id
    JOIN m_family_day_division mfdd ON mfdd.id = mfdu.id_division
WHERE
    strava_id IS NOT NULL
    AND (ofdc.id = 2)
    AND (
        ofdusa.deleted_at = 0
        OR ofdusa.deleted_at IS NULL
    )