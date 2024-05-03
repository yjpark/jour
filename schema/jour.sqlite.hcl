schema "main" {}

table "entries" {
  schema = schema.main
  column "id" {
    null = false
    type = uuid
  }
  column "version" {
    null    = false
    type    = smallint
    default = 1
  }
  column "active" {
    null    = false
    type    = bool
    default = true
  }
  column "created_at" {
    null    = false
    type    = datetime
    default = sql("(DATETIME('now'))")
  }
  column "text" {
    null = false
    type = text
  }
  column "data" {
    null = true 
    type = blob
  }
  primary_key {
    columns = [ column.id, column.version ]
  }
  index "idx_paragraph_active" {
    columns = [ column.active ]
  }
  index "idx_paragraph_created_at" {
    columns = [ column.created_at ]
  }
}