PUT /products
{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 1
    },
    "mappings": {
        "dynamic": "strict", // good idea for production, as documents with random fields will be rejected, preventing mapping explosion
        "properties": {
            "product_id": {
                "type": "keyword"
            },
            "title": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                }
            },
            "description": {
                "type": "text"
            },
            "category": {
                "type": "keyword"
            },
            "price": {
                "type": "double"
            },
            "stock_count": {
                "type": "integer"
            },
            "is_active": {
                "type": "boolean"
            },
            "created_at": {
                "type": "date"
            }
        }
    }
}

PUT /products/_doc/1
{
  "product_id": "P-1001",
  "title": "Asus ROG Strix Gaming Laptop",
  "description": "16GB RAM, 1TB NVMe SSD, RTX 4060. Perfect for hardcore gamers.",
  "category": "Electronics",
  "price": 45000.00,
  "stock_count": 15,
  "is_active": true,
  "created_at": "2023-10-25T10:00:00Z"
}

GET /products/_doc/1

POST /products/_doc/
{
  "product_id": "P-1002",
  "title": "Lenovo ThinkPad X1 Carbon",
  "description": "14-inch business laptop with Intel i7, 16GB RAM, 512GB SSD. Ideal for professionals.",
  "category": "Electronics",
  "price": 35000.00,
  "stock_count": 10,
  "is_active": true,
  "created_at": "2026-06-23T10:00:00Z"
}

GET /products/_doc/uuti-Z4BUK6modtJ-lpe

GET /products/_search


POST /products/_bulk
{ "index": { "_id": "2" } } // index this document to ID 2
{ "product_id": "P-1002", "title": "Apple MacBook Pro M3", "description": "18GB RAM, 512GB SSD. Video editing monster.", "category": "Electronics", "price": 75000.00, "stock_count": 5, "is_active": true, "created_at": "2023-11-01T10:00:00Z" } // the actual document to be indexed
{ "index": { "_id": "3" } } // index this document to ID 3
{ "product_id": "P-1003", "title": "Logitech G Pro X Superlight", "description": "Ultra lightweight wireless esports gaming mouse.", "category": "Accessories", "price": 4500.00, "stock_count": 50, "is_active": true, "created_at": "2023-11-15T10:00:00Z" } // the actual document to be indexed
{ "index": { "_id": "4" } } // index this document to ID 4
{ "product_id": "P-1004", "title": "Asus Zenbook 14", "description": "Thin and light office laptop. Not suitable for gaming.", "category": "Electronics", "price": 35000.00, "stock_count": 20, "is_active": true, "created_at": "2023-12-01T10:00:00Z" } // the actual document to be indexed


POST /products/_bulk
{"index":{"_id":"2"}}
{"product_id":"P-1002","title":"AppleMacBookProM3","description":"18GBRAM,512GBSSD.Videoeditingmonster.","category":"Electronics","price":75000.00,"stock_count":5,"is_active":true,"created_at":"2023-11-01T10:00:00Z"}
{"index":{"_id":"3"}}
{"product_id":"P-1003","title":"LogitechGProXSuperlight","description":"Ultralightweightwirelessesportsgamingmouse.","category":"Accessories","price":4500.00,"stock_count":50,"is_active":true,"created_at":"2023-11-15T10:00:00Z"}
{"index":{"_id":"4"}}
{"product_id":"P-1004","title":"AsusZenbook14","description":"Thinandlightofficelaptop.Notsuitableforgaming.","category":"Electronics","price":35000.00,"stock_count":20,"is_active":true,"created_at":"2023-12-01T10:00:00Z"}

GET /products/_count

PUT /products/_doc/10
{
  "product_id": "P-1010",
  "title": "Dell XPS 13",
  "description": "Compact and powerful ultrabook with Intel i7, 16GB RAM, 512GB SSD.",
  "category": "Electronics",
  "price": 40000.00,
  "stock_count": 8,
  "is_active": true,
  "created_at": "2023-12-15T10:00:00Z"
}

GET /products/_doc/10

PUT /products/_doc/10
{
  "price": 42000.00
}

POST /products/_update/10
{
    "doc": {
        "price": 42000.00
    }
}

PUT /products/_doc/909
{
    "product_id":"P-909",
"title":"Test Product",
"stock_count":1
}

POST /products/_update/909
{
    "doc": {
        "stock_count": 0
    }
}

GET /products/_doc/909
