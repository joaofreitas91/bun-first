ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_mananger_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_mananger_id_users_id_fk" FOREIGN KEY ("mananger_id") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
