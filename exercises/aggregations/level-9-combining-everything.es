// Exercise 26: For every theme calculate
// - number of sets
// - average price
// - average pieces
// - max price

GET lego/_search
{
    "size": 0,
    "aggs": {
        "per_theme": {
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
                },
                "max_price": {
                    "max": {
                        "field": "US_retailPrice"
                    }
                }
            }
        }
    }
}

// Exercise 27: For every release year calculate average pieces, then group by theme

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
                "avg_pieces": {
                    "avg": {
                        "field": "pieces"
                    }
                },
                "by_theme": {
                    "terms": {
                        "field": "theme"
                    }
                }
            }
        }
    }
}

// Exercise 28: For every theme only expensive sets (price > 100) and calculate average pieces.

GET lego/_search
{
    "size": 0,
    "query": {
        "range": {
            "US_retailPrice": {
                "gt": 100
            }
        }
    },
    "aggs": {
        "by_theme": {
            "terms": {
                "field": "theme"
            },
            "aggs": {
                "avg_pieces": {
                    "avg": {
                        "field": "pieces"
                    }
                }
            }
        }
    }
}

// Exercise 29: For every theme group by piece ranges.

GET lego/_search
{
    "size": 0,
    "aggs": {
        "per_theme": {
            "terms": {
                "field": "theme"
            },
            "aggs": {
                "by_piece_ranges": {
                    "range": {
                        "field": "pieces",
                        "ranges": [
                            {
                                "to": 101
                            },
                            {
                                "from": 101,
                                "to": 501
                            },
                            {
                                "from": 501
                            }
                        ]
                    }
                }
            }
        }
    }
}

// Exercise 30: For every theme return
// - count
// - average price
// - average pieces
// - maximum price
// - minimum price
// - average minifigs

GET lego/_search
{
    "size": 0,
    "aggs": {
        "per_theme": {
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
                },
                "max_price": {
                    "max": {
                        "field": "US_retailPrice"
                    }
                },
                "min_price": {
                    "min": {
                        "field": "US_retailPrice"
                    }
                },
                "avg_minifigs": {
                    "avg": {
                        "field": "minifigs",
                        "format": "####"
                    }
                }
            }
        }
    }
}