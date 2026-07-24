// User searches

// laptop

// Filters:

// Electronics
// price between 30000 and 50000
// active
// stock > 0

// Ranking:

// Asus first
// then newer products
// then products with higher stock

// Don't sort explicitly

GET products/_search
{
    "query": {
        "function_score": {
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "fields": [
                                    "title",
                                    "description"
                                ],
                                "query": "laptop"
                            }
                        }
                    ],
                    "filter": [
                        {
                            "term": {
                                "category": {
                                    "value": "Electronics"
                                }
                            }
                        },
                        {
                            "range": {
                                "price": {
                                    "gte": 30000,
                                    "lte": 50000
                                }
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
                                "is_active": {
                                    "value": true
                                }
                            }
                        }
                    ],
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
                        }
                    ]
                }
            },
            "functions": [
                {
                    "linear": {
                        "created_at": {
                            "origin": "now",
                            "scale": "365d",
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

// refactored: moved should clause to function_score functions array
GET products/_search
{
    "query": {
        "function_score": {
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "fields": [
                                    "title",
                                    "description"
                                ],
                                "query": "laptop"
                            }
                        }
                    ],
                    "filter": [
                        {
                            "term": {
                                "category": {
                                    "value": "Electronics"
                                }
                            }
                        },
                        {
                            "range": {
                                "price": {
                                    "gte": 30000,
                                    "lte": 50000
                                }
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
                                "is_active": {
                                    "value": true
                                }
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
                            "scale": "365d",
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
                },
                {
                    "filter": {
                        "multi_match": {
                            "fields": [
                                "title",
                                "description"
                            ],
                            "query": "Asus"
                        }
                    },
                    "weight": 5
                }
            ],
            "score_mode": "sum", // controls how multiple functions are combined
            "boost_mode": "sum" // controls how the combined function score interacts with the original query score
        }
    }
}