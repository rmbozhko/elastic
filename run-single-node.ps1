docker run -p 127.0.0.1:9200:9200 -d --name elasticsearch `
  -e "discovery.type=single-node" `
  -e "xpack.security.enabled=false" `
  -e "xpack.license.self_generated.type=trial" `
  -v "elasticsearch-data:/usr/share/elasticsearch/data" `
  docker.elastic.co/elasticsearch/elasticsearch:8.15.0

$uri=[Uri]'https://raw.githubusercontent.com/timothestes/elastic-for-dummies/refs/heads/main/shakespeare_hard_drive/shakespeare_7.0.json'; Invoke-WebRequest -Uri $uri -OutFile ([System.IO.Path]::GetFileName($uri.AbsolutePath))

curl.exe -s -H "Content-Type: application/x-ndjson" `
      -X POST "http://localhost:9200/_bulk" `
      --data-binary "@shakespeare_7.0.json"