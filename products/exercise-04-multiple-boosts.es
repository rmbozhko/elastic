// Exercise 4 — Multiple boosts

// Customer searches for "laptop"

// Requirements:

// Mandatory:
// Electronics
// active
// in stock

// Boost:
// Asus (strong boost)
// products added after December 2023 (medium boost)
// cheaper products (under 40000) (default boost)

// Asus should be boosted more strongly
// Notice that none of these boosts should hide documents.
GET /products/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "category": "Electronics"
                    }
                },
                {
                    "term": {
                        "is_active": true
                    }
                },
                {
                    "range": {
                        "stock_count": {
                            "gt": 0
                        }
                    }
                }
            ],
            "must": [
                {
                    "multi_match": {
                        "query": "laptop",
                        "fields": [
                            "title",
                            "description"
                        ]
                    }
                }
            ],
            "should": [
                {
                    "multi_match": {
                        "query": "Asus",
                        "fields": [
                            "title",
                            "description"
                        ],
                        "boost": 2
                    }
                },
                {
                    "range": {
                        "created_at": {
                            "gt": "2023-12-31",
                            "boost": 1.5
                        }
                    }
                },
                {
                    "range": {
                        "price": {
                            "lt": 40000
                        }
                    }
                }
            ]
        }
    }
}