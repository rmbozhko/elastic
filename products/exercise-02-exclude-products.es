// Exercise 2 — Excluding products

// A customer searches for "laptop"

// Requirements:

// search title and description
// exclude inactive products
// exclude products priced above 45000
// exclude products whose stock is zero

GET /products/_search
{
    "query": {
        "bool": {
            // Hint: read "must_not" as "exclude"
            "must_not": [
                {
                    "term": {
                        "is_active": false
                    }
                },
                {
                    "range": {
                        "price": {
                            "gt": 45000
                        }
                    }
                },
                {
                    "range": {
                        "stock_count": {
                            "lte": 0
                        }
                    }
                }
            ],
            "must": [
                {
                    "multi_match": {
                        "query": "laptop",
                        "fields": ["title", "description"]
                    }
                }
            ]
        }
    }
}
