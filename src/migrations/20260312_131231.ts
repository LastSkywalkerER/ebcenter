import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ru', 'en');
  CREATE TYPE "public"."enum_pages_blocks_principles_items_icon" AS ENUM('speed', 'accuracy', 'honesty', 'fixedPrice');
  CREATE TYPE "public"."enum_pages_blocks_advantages_items_icon" AS ENUM('check', 'shield', 'clock', 'dollar');
  CREATE TYPE "public"."enum_pages_blocks_knowledge_article_source" AS ENUM('featured', 'manual');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_tariff_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "services_tariff_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"has_tariffs" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "courses_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "courses_program_sections_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "courses_program_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0,
  	"key" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses_locales" (
  	"title" varchar NOT NULL,
  	"duration" varchar,
  	"price" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta" varchar,
  	"cta_link" varchar DEFAULT '/services',
  	"secondary_cta" varchar,
  	"secondary_cta_link" varchar DEFAULT '/training',
  	"background_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_badge_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_badge" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_seo_paragraphs_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_seo_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"link_url" varchar,
  	"link_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_tag" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"limit" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_course_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_tag" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_tag" varchar,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_principles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_principles_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_tag" varchar,
  	"section_title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_consultation_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_advantages_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_advantages_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cta_text" varchar DEFAULT 'Получить консультацию',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cta_text" varchar DEFAULT 'Узнать стоимость',
  	"is_featured" boolean DEFAULT false,
  	"featured_badge" varchar DEFAULT 'Популярный'
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_tag" varchar,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_knowledge_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_knowledge_manual_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "pages_blocks_knowledge" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"articles_title" varchar DEFAULT 'Рекомендуемые статьи',
  	"article_source" "enum_pages_blocks_knowledge_article_source" DEFAULT 'featured',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"avatar_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"show_in_nav" boolean DEFAULT false,
  	"nav_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "knowledge_base" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"is_featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "knowledge_base_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"courses_id" integer,
  	"pages_id" integer,
  	"knowledge_base_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_id" integer,
  	"header_logo_id" integer,
  	"robots_index" boolean DEFAULT true,
  	"robots_follow" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"hero_title" varchar DEFAULT 'Сметные услуги в строительстве' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'Быстрое и качественное составление документации',
  	"hero_cta" varchar DEFAULT 'Наши услуги',
  	"description_title" varchar DEFAULT 'Сметная документация и обучение сметчиков',
  	"description_text" varchar DEFAULT 'Инженерный Бизнес Центр предоставляет услуги по составлению сметной документации, по сметному обслуживанию строительных компаний в части составления отчетной документации, образовательные услуги по индивидуальному, корпоративному, дистанционному и групповому обучению сметному делу.',
  	"header_logo_text" varchar DEFAULT 'Prosmety',
  	"nav_tariffs" varchar DEFAULT 'Тарифы',
  	"nav_knowledge" varchar DEFAULT 'База знаний',
  	"nav_about" varchar DEFAULT 'О нас',
  	"footer_title" varchar DEFAULT 'ProSmety',
  	"footer_description" varchar DEFAULT 'Сметные услуги в строительстве и обучение сметному делу',
  	"footer_quick_links_title" varchar DEFAULT 'Навигация',
  	"footer_copyright" varchar DEFAULT 'Все права защищены',
  	"common_more" varchar DEFAULT 'Подробнее',
  	"common_tariffs" varchar DEFAULT 'Тарифы',
  	"common_register" varchar DEFAULT 'Записаться',
  	"common_send_request" varchar DEFAULT 'Отправить заявку',
  	"common_course_program" varchar DEFAULT 'Программа курса',
  	"common_home" varchar DEFAULT 'Главная',
  	"common_services" varchar DEFAULT 'Услуги',
  	"common_training" varchar DEFAULT 'Обучение',
  	"common_contacts" varchar DEFAULT 'Контакты',
  	"common_contact_us" varchar DEFAULT 'Связаться с нами',
  	"common_phone" varchar DEFAULT 'Телефон',
  	"common_email" varchar DEFAULT 'Email',
  	"common_address" varchar DEFAULT 'Адрес',
  	"common_working_hours" varchar DEFAULT 'Режим работы',
  	"common_name" varchar DEFAULT 'Имя',
  	"common_message" varchar DEFAULT 'Сообщение',
  	"common_select_course" varchar DEFAULT 'Выберите курс',
  	"common_view_all_services" varchar DEFAULT 'Все услуги',
  	"common_order_call" varchar DEFAULT 'Заказать звонок',
  	"common_get_consultation" varchar DEFAULT 'Получить консультацию',
  	"common_disclaimer" varchar DEFAULT 'Мы улучшили наш сайт, старую версию вы можете найти по ссылке',
  	"common_phone_error" varchar DEFAULT 'Пожалуйста, введите корректный номер телефона в формате +375XXXXXXXXX',
  	"common_success" varchar DEFAULT 'Ваше сообщение успешно отправлено!',
  	"common_error" varchar DEFAULT 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.',
  	"common_sending" varchar DEFAULT 'Отправка...',
  	"common_security_check" varchar DEFAULT 'Пожалуйста, пройдите проверку безопасности',
  	"common_security_error" varchar DEFAULT 'Проверка безопасности не пройдена. Пожалуйста, попробуйте еще раз.',
  	"common_unp" varchar DEFAULT 'УНП',
  	"validation_name_required" varchar DEFAULT 'Пожалуйста, введите ваше имя',
  	"validation_message_required" varchar DEFAULT 'Пожалуйста, введите ваше сообщение',
  	"validation_email_invalid" varchar DEFAULT 'Пожалуйста, введите корректный email адрес',
  	"services_title" varchar DEFAULT 'Наши услуги',
  	"services_subtitle" varchar DEFAULT 'Услуги в сфере строительства и проектирования',
  	"back_to_services" varchar DEFAULT 'Вернуться к услугам',
  	"back_to_service" varchar DEFAULT 'Вернуться к услуге',
  	"not_found_title" varchar DEFAULT 'Услуга не найдена',
  	"not_found_description" varchar DEFAULT 'Запрошенная услуга не существует',
  	"training_subtitle" varchar DEFAULT 'Курсы по сметному делу и ценообразованию',
  	"course_details" varchar DEFAULT 'Детали курса:',
  	"registration_title" varchar DEFAULT 'Запись на обучение',
  	"back_to_courses" varchar DEFAULT 'Вернуться к курсам',
  	"in_development" varchar DEFAULT 'Программа курса находится в разработке',
  	"course_program_title" varchar DEFAULT 'Программа курса',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"og_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contacts_locales" (
  	"contact_phone" varchar DEFAULT '+375 (29) 123-45-67',
  	"contact_email" varchar DEFAULT 'info@prosmety.by',
  	"contact_address" varchar DEFAULT 'г. Минск, ул. Примерная, 123',
  	"contact_working_hours" varchar DEFAULT 'Пн-Пт: 9:00 - 18:00',
  	"contact_unp" varchar DEFAULT '123456789',
  	"contacts_title" varchar DEFAULT 'Контакты',
  	"contacts_subtitle" varchar,
  	"contact_info_title" varchar DEFAULT 'Контакты',
  	"form_title" varchar DEFAULT 'Связаться с нами',
  	"phone_placeholder" varchar DEFAULT '+375XXXXXXXXX',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_content" ADD CONSTRAINT "services_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tariff_items_features" ADD CONSTRAINT "services_tariff_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_tariff_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tariff_items" ADD CONSTRAINT "services_tariff_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_topics" ADD CONSTRAINT "courses_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_program_sections_content" ADD CONSTRAINT "courses_program_sections_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_program_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_program_sections" ADD CONSTRAINT "courses_program_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_badge_items" ADD CONSTRAINT "pages_blocks_badge_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_badge"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_badge" ADD CONSTRAINT "pages_blocks_badge_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section" ADD CONSTRAINT "pages_blocks_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_seo_paragraphs_paragraphs" ADD CONSTRAINT "pages_blocks_seo_paragraphs_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_seo_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_seo_paragraphs" ADD CONSTRAINT "pages_blocks_seo_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_paragraphs" ADD CONSTRAINT "pages_blocks_image_text_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_list" ADD CONSTRAINT "pages_blocks_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_course_list" ADD CONSTRAINT "pages_blocks_course_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_principles_items" ADD CONSTRAINT "pages_blocks_principles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_principles" ADD CONSTRAINT "pages_blocks_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_form" ADD CONSTRAINT "pages_blocks_consultation_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages_items" ADD CONSTRAINT "pages_blocks_advantages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages" ADD CONSTRAINT "pages_blocks_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards_features" ADD CONSTRAINT "pages_blocks_pricing_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards" ADD CONSTRAINT "pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_knowledge_paragraphs" ADD CONSTRAINT "pages_blocks_knowledge_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_knowledge"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_knowledge_manual_slugs" ADD CONSTRAINT "pages_blocks_knowledge_manual_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_knowledge"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_knowledge" ADD CONSTRAINT "pages_blocks_knowledge_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_paragraphs" ADD CONSTRAINT "pages_blocks_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_stats" ADD CONSTRAINT "pages_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "knowledge_base_locales" ADD CONSTRAINT "knowledge_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."knowledge_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_knowledge_base_fk" FOREIGN KEY ("knowledge_base_id") REFERENCES "public"."knowledge_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_background_id_media_id_fk" FOREIGN KEY ("hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_header_logo_id_media_id_fk" FOREIGN KEY ("header_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contacts_locales" ADD CONSTRAINT "contacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_content_order_idx" ON "services_content" USING btree ("_order");
  CREATE INDEX "services_content_parent_id_idx" ON "services_content" USING btree ("_parent_id");
  CREATE INDEX "services_content_locale_idx" ON "services_content" USING btree ("_locale");
  CREATE INDEX "services_tariff_items_features_order_idx" ON "services_tariff_items_features" USING btree ("_order");
  CREATE INDEX "services_tariff_items_features_parent_id_idx" ON "services_tariff_items_features" USING btree ("_parent_id");
  CREATE INDEX "services_tariff_items_features_locale_idx" ON "services_tariff_items_features" USING btree ("_locale");
  CREATE INDEX "services_tariff_items_order_idx" ON "services_tariff_items" USING btree ("_order");
  CREATE INDEX "services_tariff_items_parent_id_idx" ON "services_tariff_items" USING btree ("_parent_id");
  CREATE INDEX "services_tariff_items_locale_idx" ON "services_tariff_items" USING btree ("_locale");
  CREATE UNIQUE INDEX "services_key_idx" ON "services" USING btree ("key");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_og_image_idx" ON "services_locales" USING btree ("og_image_id","_locale");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_topics_order_idx" ON "courses_topics" USING btree ("_order");
  CREATE INDEX "courses_topics_parent_id_idx" ON "courses_topics" USING btree ("_parent_id");
  CREATE INDEX "courses_topics_locale_idx" ON "courses_topics" USING btree ("_locale");
  CREATE INDEX "courses_program_sections_content_order_idx" ON "courses_program_sections_content" USING btree ("_order");
  CREATE INDEX "courses_program_sections_content_parent_id_idx" ON "courses_program_sections_content" USING btree ("_parent_id");
  CREATE INDEX "courses_program_sections_content_locale_idx" ON "courses_program_sections_content" USING btree ("_locale");
  CREATE INDEX "courses_program_sections_order_idx" ON "courses_program_sections" USING btree ("_order");
  CREATE INDEX "courses_program_sections_parent_id_idx" ON "courses_program_sections" USING btree ("_parent_id");
  CREATE INDEX "courses_program_sections_locale_idx" ON "courses_program_sections" USING btree ("_locale");
  CREATE UNIQUE INDEX "courses_key_idx" ON "courses" USING btree ("key");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses_og_image_idx" ON "courses_locales" USING btree ("og_image_id","_locale");
  CREATE UNIQUE INDEX "courses_locales_locale_parent_id_unique" ON "courses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_background_idx" ON "pages_blocks_hero" USING btree ("background_id");
  CREATE INDEX "pages_blocks_badge_items_order_idx" ON "pages_blocks_badge_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_badge_items_parent_id_idx" ON "pages_blocks_badge_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_badge_items_locale_idx" ON "pages_blocks_badge_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_badge_order_idx" ON "pages_blocks_badge" USING btree ("_order");
  CREATE INDEX "pages_blocks_badge_parent_id_idx" ON "pages_blocks_badge" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_badge_path_idx" ON "pages_blocks_badge" USING btree ("_path");
  CREATE INDEX "pages_blocks_badge_locale_idx" ON "pages_blocks_badge" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locale_idx" ON "pages_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_locale_idx" ON "pages_blocks_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_section_order_idx" ON "pages_blocks_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_parent_id_idx" ON "pages_blocks_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_path_idx" ON "pages_blocks_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_locale_idx" ON "pages_blocks_section" USING btree ("_locale");
  CREATE INDEX "pages_blocks_seo_paragraphs_paragraphs_order_idx" ON "pages_blocks_seo_paragraphs_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_seo_paragraphs_paragraphs_parent_id_idx" ON "pages_blocks_seo_paragraphs_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_seo_paragraphs_paragraphs_locale_idx" ON "pages_blocks_seo_paragraphs_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_seo_paragraphs_order_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_seo_paragraphs_parent_id_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_seo_paragraphs_path_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_path");
  CREATE INDEX "pages_blocks_seo_paragraphs_locale_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_text_paragraphs_order_idx" ON "pages_blocks_image_text_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_paragraphs_parent_id_idx" ON "pages_blocks_image_text_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_paragraphs_locale_idx" ON "pages_blocks_image_text_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_locale_idx" ON "pages_blocks_image_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_service_list_order_idx" ON "pages_blocks_service_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_list_parent_id_idx" ON "pages_blocks_service_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_list_path_idx" ON "pages_blocks_service_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_list_locale_idx" ON "pages_blocks_service_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_course_list_order_idx" ON "pages_blocks_course_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_course_list_parent_id_idx" ON "pages_blocks_course_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_course_list_path_idx" ON "pages_blocks_course_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_course_list_locale_idx" ON "pages_blocks_course_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_info_locale_idx" ON "pages_blocks_contact_info" USING btree ("_locale");
  CREATE INDEX "pages_blocks_principles_items_order_idx" ON "pages_blocks_principles_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_principles_items_parent_id_idx" ON "pages_blocks_principles_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_principles_items_locale_idx" ON "pages_blocks_principles_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_principles_order_idx" ON "pages_blocks_principles" USING btree ("_order");
  CREATE INDEX "pages_blocks_principles_parent_id_idx" ON "pages_blocks_principles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_principles_path_idx" ON "pages_blocks_principles" USING btree ("_path");
  CREATE INDEX "pages_blocks_principles_locale_idx" ON "pages_blocks_principles" USING btree ("_locale");
  CREATE INDEX "pages_blocks_consultation_form_order_idx" ON "pages_blocks_consultation_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_consultation_form_parent_id_idx" ON "pages_blocks_consultation_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consultation_form_path_idx" ON "pages_blocks_consultation_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_consultation_form_locale_idx" ON "pages_blocks_consultation_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_advantages_items_order_idx" ON "pages_blocks_advantages_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_advantages_items_parent_id_idx" ON "pages_blocks_advantages_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_advantages_items_locale_idx" ON "pages_blocks_advantages_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_advantages_order_idx" ON "pages_blocks_advantages" USING btree ("_order");
  CREATE INDEX "pages_blocks_advantages_parent_id_idx" ON "pages_blocks_advantages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_advantages_path_idx" ON "pages_blocks_advantages" USING btree ("_path");
  CREATE INDEX "pages_blocks_advantages_locale_idx" ON "pages_blocks_advantages" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_cards_features_order_idx" ON "pages_blocks_pricing_cards_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_features_parent_id_idx" ON "pages_blocks_pricing_cards_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_features_locale_idx" ON "pages_blocks_pricing_cards_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_cards_order_idx" ON "pages_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_parent_id_idx" ON "pages_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_locale_idx" ON "pages_blocks_pricing_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_locale_idx" ON "pages_blocks_pricing" USING btree ("_locale");
  CREATE INDEX "pages_blocks_knowledge_paragraphs_order_idx" ON "pages_blocks_knowledge_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_knowledge_paragraphs_parent_id_idx" ON "pages_blocks_knowledge_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_knowledge_paragraphs_locale_idx" ON "pages_blocks_knowledge_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_knowledge_manual_slugs_order_idx" ON "pages_blocks_knowledge_manual_slugs" USING btree ("_order");
  CREATE INDEX "pages_blocks_knowledge_manual_slugs_parent_id_idx" ON "pages_blocks_knowledge_manual_slugs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_knowledge_manual_slugs_locale_idx" ON "pages_blocks_knowledge_manual_slugs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_knowledge_order_idx" ON "pages_blocks_knowledge" USING btree ("_order");
  CREATE INDEX "pages_blocks_knowledge_parent_id_idx" ON "pages_blocks_knowledge" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_knowledge_path_idx" ON "pages_blocks_knowledge" USING btree ("_path");
  CREATE INDEX "pages_blocks_knowledge_locale_idx" ON "pages_blocks_knowledge" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_paragraphs_order_idx" ON "pages_blocks_about_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_paragraphs_parent_id_idx" ON "pages_blocks_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_paragraphs_locale_idx" ON "pages_blocks_about_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_stats_order_idx" ON "pages_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_stats_parent_id_idx" ON "pages_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_stats_locale_idx" ON "pages_blocks_about_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_locale_idx" ON "pages_blocks_about" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_avatar_idx" ON "pages_blocks_about" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_og_image_idx" ON "pages_locales" USING btree ("og_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "knowledge_base_slug_idx" ON "knowledge_base" USING btree ("slug");
  CREATE INDEX "knowledge_base_updated_at_idx" ON "knowledge_base" USING btree ("updated_at");
  CREATE INDEX "knowledge_base_created_at_idx" ON "knowledge_base" USING btree ("created_at");
  CREATE UNIQUE INDEX "knowledge_base_locales_locale_parent_id_unique" ON "knowledge_base_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_knowledge_base_id_idx" ON "payload_locked_documents_rels" USING btree ("knowledge_base_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_hero_background_idx" ON "site_settings" USING btree ("hero_background_id");
  CREATE INDEX "site_settings_header_logo_idx" ON "site_settings" USING btree ("header_logo_id");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings_locales" USING btree ("og_image_id","_locale");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contacts_locales_locale_parent_id_unique" ON "contacts_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "services_content" CASCADE;
  DROP TABLE "services_tariff_items_features" CASCADE;
  DROP TABLE "services_tariff_items" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "courses_topics" CASCADE;
  DROP TABLE "courses_program_sections_content" CASCADE;
  DROP TABLE "courses_program_sections" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_badge_items" CASCADE;
  DROP TABLE "pages_blocks_badge" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_section" CASCADE;
  DROP TABLE "pages_blocks_seo_paragraphs_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_seo_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_image_text_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_service_list" CASCADE;
  DROP TABLE "pages_blocks_course_list" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "pages_blocks_principles_items" CASCADE;
  DROP TABLE "pages_blocks_principles" CASCADE;
  DROP TABLE "pages_blocks_consultation_form" CASCADE;
  DROP TABLE "pages_blocks_advantages_items" CASCADE;
  DROP TABLE "pages_blocks_advantages" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_knowledge_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_knowledge_manual_slugs" CASCADE;
  DROP TABLE "pages_blocks_knowledge" CASCADE;
  DROP TABLE "pages_blocks_about_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_about_stats" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "knowledge_base" CASCADE;
  DROP TABLE "knowledge_base_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "contacts" CASCADE;
  DROP TABLE "contacts_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_principles_items_icon";
  DROP TYPE "public"."enum_pages_blocks_advantages_items_icon";
  DROP TYPE "public"."enum_pages_blocks_knowledge_article_source";`)
}
