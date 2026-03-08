CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"kakao_id" varchar(64) NOT NULL,
	"nickname" varchar(20) NOT NULL,
	"profile_image" varchar(500),
	"refresh_token" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_kakao_id_unique" UNIQUE("kakao_id")
);
