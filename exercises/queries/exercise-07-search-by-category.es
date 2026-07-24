// The user opens Electronics.

// They don't type anything.

// Requirements:

// only Electronics
// active
// stock > 0
// sort newest first

// No full-text query is needed.

GET products/_search
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
                    "term": {
                        "is_active": true
                    }
                }
            ]
        }
    },
    "sort": [
        {
            "created_at": {
                "order": "desc"
            }
        },
        {
            "price": {
                "order": "desc"
            }
        }
    ]
}