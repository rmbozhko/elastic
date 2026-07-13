// Exercise 1 — Basic bool query

// A customer searches for "laptop"

// Requirements:

// product must be active
// category must be Electronics
// stock_count > 0
// price < 50000
// if the product is Asus, rank it higher
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
                    "range": {
                        "stock_count": {
                            "gt": 0
                        }
                    }
                },
                {
                    "range": {
                        "price": {
                            "lte": 50000
                        }
                    }
                }
            ],
            "must_not": [
                {
                    "term": {
                        "is_active": false
                    }
                }
            ],
            "must": [
                {
                    "match": {
                        "title": "laptop"
                    }
                }
            ],
            "should": [
                {
                    "match": {
                        "title": "Asus"
                    }
                }
            ]
        }
    }
}