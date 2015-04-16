json.array! @missions do |mission|
  json.id mission.id
  json.title mission.title
  json.images mission.images
  json.latitude mission.latitude
  json.longitude mission.longitude
  json.start_date mission.start_date
  json.end_date mission.end_date
  json.completed mission.completed
  json.compensation mission.compensation
  json.leader do
    json.id mission.leader.id
    json.filepicker_url mission.leader.filepicker_url
    json.username mission.leader.username
  end
end
