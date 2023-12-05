alter table "public"."bookmarks" add column "favorite" boolean not null default false;

create policy "allow users to view their own bookmarks"
on "public"."bookmarks"
as permissive
for select
to authenticated
using ((auth.uid() = inserted_by));



