// Exercise 6 — Exact product lookup

// Customer searches for "P-1002"

// Business wants
// exact product_id matches first
// title matches second
// description matches third

// This teaches when term is better than match and hierarchy should be enforced.

// Run this query:
POST /products/_update/2
{
    "doc": {
        "product_id": "P-1020",
        "description": "18GB RAM, 512GB SSD. Video editing monster. It is not a P-1002, but it is a P-1020."
    }
}

// Run this query:
PUT /products/_doc/2_dup
{
  "product_id": "P-1002(D)",
  "title": "(Duplicate of P-1002) Asus ROG Strix Gaming Laptop",
  "description": "16GB RAM, 1TB NVMe SSD, RTX 4060. Perfect for hardcore gamers.",
  "category": "Electronics",
  "price": 45000.00,
  "stock_count": 15,
  "is_active": true,
  "created_at": "2023-10-25T10:00:00Z"
}


GET /products/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "term": {
                        "product_id": {
                            "value": "P-1002",
                            "boost": 100
                        }
                    }
                },
                {
                    "match": {
                        "title": {
                            "query": "P-1002",
                            "boost": 5
                        }
                    }
                },
                {
                    "match": {
                        "description": {
                            "query": "P-1002",
                            "boost": 1
                        }
                    }
                }
            ]
        }
    }
}
