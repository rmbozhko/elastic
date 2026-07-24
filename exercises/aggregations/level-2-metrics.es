// Exercise 5: For every theme calculate:
// - average price
// - average number of pieces

GET lego/_search
{
    "size": 0,
    "aggs": {
        "stats_per_theme": {
            "terms": {
                "field": "theme"
            },
            "aggs": {
                "avg_price": {
                    "avg": {
                        "field": "US_retailPrice",
                        "format": "####"
                    }
                },
                "avg_pieces": {
                    "avg": {
                        "field": "pieces",
                        "format": "####"
                    }
                }
            }
        }
    }
}

// Exercise 6: Find the theme with the highest average piece count.
// buckets by theme, order by avg_pieces
// avg prices

GET lego/_search
{
    "size": 0,
    "aggs": {
        "by_theme": {
            "terms": {
                "field": "theme",
                "order": {
                    "avg_pieces_number": "desc"
                }
            },
            "aggs": {
                "avg_pieces_number": {
                    "avg": {
                        "field": "pieces",
                        "format": "####"
                    }
                }
            }
        }
    }
}


// Exercise 7: For every year find

// - average price
// - average pieces
// - average minifigures

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
                "avg_price": {
                    "avg": {
                        "field": "US_retailPrice"
                    }
                },
                "avg_pieces": {
                    "avg": {
                        "field": "pieces"
                    }
                },
                "avg_minifigures": {
                    "avg": {
                        "field": "minifigs"
                    }
                }
            }
        }
    }
}

// Exercise 8: Find cheapest and most expensive set.

GET lego/_search
{
    "size": 0,
    "aggs": {
        "cheapest_set": {
            "min": {
                "field": "US_retailPrice"
            }
        },
        "most_expensive_set": {
            "max": {
                "field": "US_retailPrice"
            }
        }
    }
}