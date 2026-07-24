// Exercise 5 — Fresh inventory

// Search for "laptop"

// Requirements

// Mandatory:
// Electronics
// active

// Should:
// created in the last 12 months
// stock_count > 10

// Question:
// Should those two conditions be filter or should?


GET /products/_search
{
    "query": {
        "function_score": {
            "query": {
                "bool": {
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
                    ]
                }
            },
            "functions": [
                {
                    "linear": {
                        "created_at": {
                            "origin": "now",
                            "scale": "1000d",
                            "offset": "0d",
                            "decay": 0.5
                        }
                    }
                },
                {
                    "field_value_factor": {
                        "field": "stock_count",
                        "factor": 0.1,
                        "modifier": "log1p",
                        "missing": 0
                    }
                }
            ],
            "score_mode": "sum", // controls how multiple functions are combined
            "boost_mode": "sum" // controls how the combined function score interacts with the original query score
        }
    }
}
