// Customer searches

// laptop

// Requirements

// Mandatory

// active

// Accept products if

// category Electronics

// OR

// category Accessories

// but Electronics should score higher.

PUT products/_create/12
{
    "title": "A laptop pad",
    "description": "A laptop pad for your laptop",
    "category": "Accessories",
    "price": 500.00,
    "stock_count": 100,
    "is_active": true,
    "created_at": "2024-10-25T10:00:00Z"
}

PUT products/_create/13
{
    "title": "A laptop charger",
    "description": "A charger for various laptops",
    "category": "Accessories",
    "price": 1500.00,
    "stock_count": 50,
    "is_active": true,
    "created_at": "2024-05-20T10:00:00Z"
}

PUT products/_create/14
{
    "title": "Laptop Repair Manual",
    "description": "A manual for repairing laptops",
    "category": "Books",
    "price": 300.00,
    "stock_count": 20,
    "is_active": true,
    "created_at": "2024-01-15T10:00:00Z"
}

GET products/_doc/13

// title == 'laptop' AND (category == 'Electronics' OR category == 'Accessories')
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
                                "term": {
                                    "category": {
                                        "value": "Electronics",
                                        "boost": 2
                                    }
                                }
                            },
                            {
                                "term": {
                                    "category": "Accessories"
                                }
                            }
                        ],
                        "minimum_should_match": 1
                    }
                }
            ],
            "filter": [
                {
                    "term": {
                        "is_active": true
                    }
                }
            ]
        }
    }
}