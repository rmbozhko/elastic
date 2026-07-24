// Without excluding anything:

// Boost

// Asus ×5
// created this year ×2
// stock > 20 ×1.5

// This is a pure scoring exercise.

GET products/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "multi_match": {
                        "fields": [
                            "title",
                            "description"
                        ],
                        "query": "Asus",
                        "boost": 5
                    }
                },
                {
                    "range": {
                        "created_at": {
                            "gte": "2026-01-01",
                            "boost": 2
                        }
                    }
                },
                {
                    "range": {
                        "stock_count": {
                            "gt": 20,
                            "boost": 1.5
                        }
                    }
                }
            ]
        }
    }
}