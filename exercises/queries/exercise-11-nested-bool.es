// Customer searches

// > laptop

// Requirements

// Mandatory

// active

// Then satisfy one of these groups:

// Group A

// - Electronics
// - price under 40000

// Group B

// - Electronics
// - Asus product

PUT products/_create/15
{
    "title": "Asus ROG Strix Morph 96 Wireless Gaming Keyboard",
    "description": "A wireless gaming keyboard with customizable keys and RGB lighting.",
    "category": "Accessories",
    "price": 2500,
    "stock_count": 30,
    "is_active": true,
    "created_at": "2024-08-15T10:00:00Z"
}

PUT products/_create/16
{
    "title": "Asus ROG Courser Core Gaming Chair",
    "description": "An ergonomic gaming chair with adjustable height and lumbar support.",
    "category": "Accessories",
    "price": 29999,
    "stock_count": 6,
    "is_active": true,
    "created_at": "2025-07-11T10:00:00Z"
}

PUT products/_create/17
{
    "title": "Blackview Tab 8 Pro 4G Tablet",
    "description": "A budget-friendly tablet with a 10.1-inch display and 4G connectivity.",
    "category": "Electronics",
    "price": 7399,
    "stock_count": 18,
    "is_active": true,
    "created_at": "2026-05-19T10:00:00Z"
}

PUT products/_create/17
{
    "title": "Blackview Tab 8 Pro 4G Tablet",
    "description": "A budget-friendly tablet with a 10.1-inch display and 4G connectivity.",
    "category": "Electronics",
    "price": 7399,
    "stock_count": 18,
    "is_active": true,
    "created_at": "2026-05-19T10:00:00Z"
}

// This is your first nested bool query.
GET products/_doc/17

// title == 'laptop' AND (price_group OR asus_group)
GET products/_search
{
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
                },
                {
                    "bool": {
                        "should": [
                            {
                                "bool": {
                                    "must": [
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
                                                    "lt": 40000
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "bool": {
                                    "must": [
                                        {
                                            "term": {
                                                "category": {
                                                    "value": "Electronics"
                                                }
                                            }
                                        },
                                        {
                                            "match": {
                                                "title": {
                                                    "query": "Asus"
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ],
            "filter": [
                {
                    "term": {
                        "is_active": {
                            "value": true
                        }
                    }
                }
            ]
        }
    }
}

// Refactored query: title == 'laptop' AND category == 'Electronics' AND (price < 40000 OR title == 'Asus')
GET products/_search
{
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
                },
                {
                    "term": {
                        "category": {
                            "value": "Electronics"
                        }
                    }
                },
                {
                    "bool": {
                        "should": [
                            {
                                "range": {
                                    "price": {
                                        "lt": 40000
                                    }
                                }
                            },
                            {
                                "match": {
                                    "title": {
                                        "query": "Asus"
                                    }
                                }
                            }
                        ]
                    }
                }
            ],
            "filter": [
                {
                    "term": {
                        "is_active": {
                            "value": true
                        }
                    }
                }
            ]
        }
    }
}