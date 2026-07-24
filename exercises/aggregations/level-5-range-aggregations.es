// Exercise 15: Create piece ranges

GET lego/_search
{
    "size": 0,
    "aggs": {
        "pieces_by_ranges": {
            "range": {
                "field": "pieces",
                "ranges": [
                    {
                        "to": 101
                    },
                    {
                        "from": 101,
                        "to": 301
                    },
                    {
                        "from": 301,
                        "to": 601
                    },
                    {
                        "from": 601,
                        "to": 1001
                    },
                    {
                        "from": 1001
                    }
                ]
            }
        }
    }
}

// Exercise 16: Create price ranges

GET lego/_search
{
    "size": 0,
    "aggs": {
        "ranges_by_price": {
            "range": {
                "field": "US_retailPrice",
                "ranges": [
                    {
                        "to": 21
                    },
                    {
                        "from": 21,
                        "to": 51
                    },
                    {
                        "from": 51,
                        "to": 101
                    },
                    {
                        "from": 101,
                        "to": 251
                    },
                    {
                        "from": 251
                    }
                ]
            }
        }
    }
}

// Exercise 17: Create age ranges

GET lego/_search
{
    "size": 0,
    "aggs": {
        "ranges_by_age": {
            "range": {
                "field": "agerange_min",
                "ranges": [
                    {
                        "from": 4,
                        "to": 7
                    },
                    {
                        "from": 7,
                        "to": 10 
                    },
                    {
                        "from": 10,
                        "to": 13
                    },
                    {
                        "from": 13
                    }
                ]
            }
        }
    }
}