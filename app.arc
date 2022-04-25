@app
atdt-grunge-3922

@aws
region ap-southeast-2

@http
/*
  method any
  src server

@plugins
architect/plugin-lambda-invoker

@shared

@static

@scheduled
hourly-update-podcast rate(1 hour)

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId

podcast
  pk *String #podcastId
