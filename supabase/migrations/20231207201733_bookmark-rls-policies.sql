create policy "Users can delete their own bookmarks"
on "public"."bookmarks"
as permissive
for delete
to authenticated
using ((auth.uid() = inserted_by));


create policy "Users can insert new bookmarks"
on "public"."bookmarks"
as permissive
for insert
to authenticated
with check ((auth.uid() = inserted_by));


create policy "Users can update their own bookmarks"
on "public"."bookmarks"
as permissive
for update
to authenticated
using ((auth.uid() = inserted_by));


create policy "Users can view their own bookmarks"
on "public"."bookmarks"
as permissive
for select
to authenticated
using ((auth.uid() = inserted_by));



