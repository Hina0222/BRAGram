ALTER TABLE "mission_submissions" ADD COLUMN "image_urls" jsonb;--> statement-breakpoint
UPDATE "mission_submissions" SET "image_urls" = json_build_array("image_url");--> statement-breakpoint
ALTER TABLE "mission_submissions" ALTER COLUMN "image_urls" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mission_submissions" DROP COLUMN "image_url";
