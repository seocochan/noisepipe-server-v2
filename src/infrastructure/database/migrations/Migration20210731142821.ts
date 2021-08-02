import { Migration } from '@mikro-orm/migrations';

export class Migration20210731142821 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "country" varchar(255) not null, "postal_code" varchar(255) not null, "street" varchar(255) not null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_pkey" primary key ("id");',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
  }
}
