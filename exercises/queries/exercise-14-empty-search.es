// User simply opens the store.

// Requirements

// active
// in stock
// newest first

// No query string.

// What query should be used instead of match?

GET products/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "is_active": {
                            "value": true
                        }
                    }
                },
                {
                    "range": {
                        "stock_count": {
                            "gt": 0
                        }
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
        }
    ]
}