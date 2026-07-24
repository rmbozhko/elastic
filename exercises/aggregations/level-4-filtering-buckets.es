// Exercise 12: Find only expensive sets (price > 200) and group by theme.

GET lego/_search
{
    "size": 0,
    "query": {
        "range": {
            "US_retailPrice": {
                "gt": 200
            }
        }
    },
    "aggs": {
        "by_theme": {
            "terms": {
                "field": "theme"
            }
        }
    }
}

// Exercise 13: Find sets released after 2015, group them by year and find:
// - average price
// - average pieces

GET lego/_search
{
    "size": 0,
    "query": {
        "range": {
            "year": {
                "gt": 2015
            }
        }
    },
    "aggs": {
        "by_year": {
            "histogram": {
                "field": "year",
                "interval": 1
            },
            "aggs": {
                "avg_price": {
                    "avg": {
                        "field": "US_retailPrice",
                        "format": "#####"
                    }
                },
                "avg_pieces": {
                    "avg": {
                        "field": "pieces",
                        "format": "#####"
                    }
                }
            }
        }
    }
}

// Exercise 14: Find only Star Wars sets, group them by year

GET lego/_search
{
    "size": 0,
    "query": {
        "term": {
            "theme": {
                "value": "Star Wars"
            }
        }
    },
    "aggs": {
        "star_wars_sets_by_year": {
            "histogram": {
                "field": "year",
                "interval": 1
            }
        }
    }
}
