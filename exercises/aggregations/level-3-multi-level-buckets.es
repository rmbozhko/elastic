// Exercise 9: Find the largest subthemes inside each theme.

GET lego/_search
{
    "size": 0,
    "aggs": {
        "by_themes": {
            "terms": {
                "field": "theme"
            },
            "aggs": {
                "by_subthemes": {
                    "terms": {
                        "field": "subtheme",
                        "size": 1
                    }
                }
            }
        }
    }
}

// Exercise 10: Group themes by themeGroup 
GET lego/_search
{
    "size": 0,
    "aggs": {
        "by_themeGroup": {
            "terms": {
                "field": "themeGroup"
            },
            "aggs": {
                "by_theme": {
                    "terms": {
                        "field": "theme"
                    }
                }
            }
        }
    }
}

// Exercise 11: For each year find:
// - average price
// - maximum price
// - minimum price

GET lego/_search
{
    "size": 0,
    "aggs": {
        "per_year": {
            "histogram": {
                "field": "year",
                "interval": 1
            },
            "aggs": {
                "price_stats": {
                    "stats": {
                        "field": "US_retailPrice"
                    }
                }
            }
        }
    }
}