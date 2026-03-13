CREATE TYPE "public"."pet_gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TYPE "public"."pet_type" AS ENUM('cat', 'dog');--> statement-breakpoint
CREATE TABLE "pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(15) NOT NULL,
	"type" "pet_type" NOT NULL,
	"breed" varchar(50),
	"birth_date" date,
	"gender" "pet_gender",
	"bio" varchar(60),
	"image_url" varchar(500),
	"is_active" boolean DEFAULT false NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"weekly_score" integer DEFAULT 0 NOT NULL,
	"monthly_score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "missions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"example_image_url" varchar(500),
	"base_score" integer DEFAULT 10 NOT NULL,
	"scheduled_at" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "missions_scheduled_at_unique" UNIQUE("scheduled_at")
);
--> statement-breakpoint
CREATE TABLE "mission_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"mission_id" integer NOT NULL,
	"pet_id" integer NOT NULL,
	"image_url" varchar(500) NOT NULL,
	"comment" varchar(150),
	"hashtags" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mission_submissions_mission_pet_unique" UNIQUE("mission_id","pet_id")
);
--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mission_submissions" ADD CONSTRAINT "mission_submissions_mission_id_missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."missions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mission_submissions" ADD CONSTRAINT "mission_submissions_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;