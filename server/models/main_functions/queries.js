module.exports = {

  getInfo: `select user_id, user_email,
  (
    select array_to_json(array_agg(row_to_json(d)))
    from (
      select calendars.calendar_id, calendars.user_id, calendars.calendar_owner,
      coalesce(
          (
          select array_to_json(array_agg(row_to_json(y)))
          from(
            SELECT
            categories.category_id,
            categories.category,
            coalesce(
              (
              select array_to_json(array_agg(row_to_json(z)))
              from(
                SELECT
                todoitems.id,
                todoitems.title,
                todoitems.description,
                todoitems.duration,
                todoitems.start,
                todoitems.end_date,
                todoitems.in_calendar
                FROM todoitems
                where todoitems.category_id = categories.category_id
              ) z
            ), '[]'
          ) as items
            FROM categories
            where categories.calendar_id = calendars.calendar_id
          ) y
        ), '[]'
      ) as categories
        from calendars
        where calendars.user_id = users.user_id
    ) d
  ) as calendars
from users
where user_email = $1;
`,
  getSharedByUser: `SELECT shared_to FROM sharedCals WHERE user_email = $1;`,
  getSharedWithUser: `SELECT user_email FROM sharedCals WHERE shared_to = $1;`,
  deleteFromShares: `DELETE FROM sharedCals WHERE shared_to = $1 RETURNING *;`,
  userExists: `SELECT user_email FROM users WHERE user_email = $1;`,

}
<<<<<<< HEAD
=======

>>>>>>> cd46b452c364b6b1bfa2d418f64275265cd7ffc3
