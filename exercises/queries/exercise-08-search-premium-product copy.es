// Customer searches

// laptop

// Requirements

// Mandatory:

// active
// Electronics

// Prefer

// price above 40000
// stock above 10

// Notice that "expensive" is considered premium here.

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
                            "gt": 40000
                        }
                    }
                },
                {
                    "range": {
                        "stock_count": {
                            "gt": 10
                        }
                    }
                }
            ]
        }
    }
}