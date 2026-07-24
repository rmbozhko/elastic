// Customer searches

// laptop

// Requirements

// Mandatory:

// active
// Electronics

// Should

// under 40000
// stock above 5

GET products/_search
{
    "query": {
        "bool": {
            "must": {
                "multi_match": {
                    "fields": [
                        "title",
                        "description"
                    ],
                    "query": "laptop"
                }
            },
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
                }
            ],
            "should": [
                {
                    "range": {
                        "price": {
                            "lt": 40000
                        }
                    }
                },
                {
                    "range": {
                        "stock_count": {
                            "gt": 5
                        }
                    }
                }
            ]
        }
    }
}