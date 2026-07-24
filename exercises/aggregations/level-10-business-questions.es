// Q1: Which themes generate the highest total value?

// buckets grouped by theme, sum US_retailPrice, order buckets by total_value and size = 5, 

GET lego/_search
{
    "size": 0,
    "aggs": {
        "by_theme": {
            "terms": {
                "field": "theme",
                "order": {
                    "total_value": "desc"
                },
                "size": 5
            },
            "aggs": {
                "total_value": {
                    "sum": {
                        "field": "US_retailPrice"
                    }
                }
            }
        }
    }
}


// Q2: Are LEGO sets becoming larger over time?

// group by year histogram interval=1, average pieces

GET lego/_search
{
    "size": 0,
    "aggs": {
        "by_year": {
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
                "max_pieces": {
                    "max": {
                        "field": "pieces"
                    }
                }
            }
        }
    }
}

// Q3: Which themes offer the best "pieces per dollar" value?

// group by theme, value = pieces / US_retailPrice, avg value, order avg value desc, size = 5

GET lego/_search
{
    "size": 0,
    "aggs": {
        "by_theme": {
            "terms": {
                "field": "theme",
                "order": {
                    "pieces_per_dollar": "desc"
                },
                "size": 5
            },
            "aggs": {
                "pieces_per_dollar": {
                    "avg": {
                        "script": {
                            "source": "if (!doc['US_retailPrice'].isEmpty() && !doc['pieces'].isEmpty() && doc['US_retailPrice'].value > 0) { return doc['pieces'].value / doc['US_retailPrice'].value; }"
                        },
                        "missing": 0
                    }
                }
            }
        }
    }
}

// Q4: Which release year had the most expensive average sets?

// group by year, avg price, order avg price, size = 1
GET lego/_search
{
    "size": 0,
    "aggs": {
        "by_year": {
            "histogram": {
                "field": "year",
                "interval": 1,
                "order": {
                    "avg_price": "desc"
                }
            },
            "aggs": {
                "avg_price": {
                    "avg": {
                        "field": "US_retailPrice",
                        "missing": 0
                    }
                }
            }
        }
    }
}

// Q5: Which themes consistently produce large sets?

// group by themes
GET lego/_search?size=0
{
    "query": {
        "range": {
            "pieces": {
                "gte": 100
            }
        }
    },
    "aggs": {
        "per_theme": {
            "terms": {
                "field": "theme",
                "min_doc_count": 3,
                "order": {
                    "pieces_ex_stats.std_deviation": "asc"
                }
            },
            "aggs": {
                "pieces_ex_stats": {
                    "extended_stats": {
                        "field": "pieces"
                    }
                }
            }
        }
    }   
}