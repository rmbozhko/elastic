// Exercise 3 — Phrase search

// Customer searches for "gaming laptop"

// Business requirements:

// prefer documents where the exact phrase appears
// still allow documents containing both words separately
// only active products

// This introduces combining match and match_phrase.

PUT /products/_doc/11
{
  "product_id": "P-1011",
  "title": "Gaming Monitor 27-inch",
  "description": "27-inch gaming monitor with 144Hz refresh rate. Perfect for immersive gaming experiences.",
  "category": "Electronics",
  "price": 30000.00,
  "stock_count": 5,
  "is_active": true,
  "created_at": "2026-06-23T10:00:00Z"
}


GET /products/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "is_active": true
                    }
                }
            ],
            "must": [
                {
                    "multi_match": {
                        "query": "gaming laptop",
                        "fields": ["title", "description"]
                    }
                }
            ],
            "should": [
                {
                    "multi_match": {
                        "query": "gaming laptop",
                        "type": "phrase",
                        "fields": ["title", "description"]
                    }
                }
            ]
        }
    }
}