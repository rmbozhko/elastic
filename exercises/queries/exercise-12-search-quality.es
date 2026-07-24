// Customer searches

// Asus gaming laptop

// Requirements

// title matches are more important than description
// if all three words appear, increase score
// if only "Asus" appears, still return it
// active only

GET products/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "multi_match": {
                        "fields": [
                            "title^3",
                            "description"
                        ],
                        "query": "Asus gaming laptop"
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
            ],
            "should": [
                // Option 1
                // {
                //     "multi_match": {
                //         "fields": [
                //             "title",
                //             "description"
                //         ],
                //         "query": "Asus gaming laptop",
                //         "boost": 5,
                //         "minimum_should_match": "100%"
                //     }
                // }
                // Option 2
                {
                    "multi_match": {
                        "fields": [
                            "title",
                            "description"
                        ],
                        "query": "Asus gaming laptop",
                        "operator": "and",
                        "boost": 5
                    }
                }
            ]
        }
    }
}