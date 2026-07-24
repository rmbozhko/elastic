GET temp_ecommerce_data/_search
{
    "track_total_hits": true
}

PUT ecommerce_data
{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 1
    },
    "mappings": {
        "properties": {
            "Country": {
                "type": "keyword"
            },
            "CustomerID": {
                "type": "long"
            },
            "Description": {
                "type": "text"
            },
            "InvoiceDate": {
                "type": "date",
                "format": "M/d/yyyy H:m"
            },
            "InvoiceNo": {
                "type": "keyword"
            },
            "Quantity": {
                "type": "long"
            },
            "StockCode": {
                "type": "keyword"
            },
            "UnitPrice": {
                "type": "double"
            }
        }
    }
}

GET ecommerce_data/_search
{
    "track_total_hits": true
}

POST _reindex
{
    "source": {
        "index": "temp_ecommerce_data"
    },
    "dest": {
        "index": "ecommerce_data"
    }
}

GET ecommerce_data/_search
{
    "query": {
        "range": {
            "UnitPrice": {
                "gte": 500
            }
        }
    }
}

POST ecommerce_data/_delete_by_query
{
    "query": {
        "range": {
            "UnitPrice": {
                "gte": 500
            }
        }
    }
}

GET ecommerce_data/_search

// get the sum of unit price for all documents in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "sum_unit_price": {
            "sum": {
                "field": "UnitPrice"
            }
        }
    }
}

GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "lowest_unit_price": {
            "min": {
                "field": "UnitPrice"
            }
        }
    }
}

// get the highest unit price for all documents in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "highest_unit_price": {
            "max": {
                "field": "UnitPrice"
            }
        }
    }
}

// get the unit price field statistics for all documents in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "unit_price_stats": {
            "stats": {
                "field": "UnitPrice"
            }
        }
    }
}


// get the unique count of customers in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "unique_customers_count": {
            "cardinality": {
                "field": "CustomerID"
            }
        }
    }
}

// get the average unit price for all documents in the ecommerce_data index where the country is Germany
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "avg_unit_price_in_ge": {
            "avg": {
                "field": "UnitPrice"
            }
        }
    },
    "query": {
        "term": {
            "Country": "Germany"
        }
    }
}

// get the average unit price per country in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "avg_unit_price_per_country": {
            "terms": {
                "field": "Country"
            },
            "aggs": {
                "avg_unit_price": {
                    "avg": {
                        "field": "UnitPrice"
                    }
                }
            }
        }
    }
}

// get the number of transactions per day in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "transactions_by_day": {
            "date_histogram": {
                "field": "InvoiceDate",
                "fixed_interval": "1d"
            }
        }
    }
}

// get the number of transactions per month in the ecommerce_data index sorted by the most recent month first
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "transactions_by_month": {
            "date_histogram": {
                "field": "InvoiceDate",
                "calendar_interval": "1M",
                "order": {
                    "_key": "desc"
                }
            }
        }
    }
}

GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "price_intervals": {
            "histogram": {
                "field": "UnitPrice",
                "interval": 10,
                "order": {
                    "_key": "desc"
                }
            }
        }
    }
}

// get the number of transactions per price range in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "transactions_by_range": {
            "range": {
                "field": "UnitPrice",
                "ranges": [
                    {
                        "to": 50
                    },
                    {
                        "from": 50,
                        "to": 200
                    },
                    {
                        "from": 200
                    }
                ]
            }
        }
    }
}

// get the top 5 customers with the most transactions in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "top_5_customers": {
            "terms": {
                "field": "CustomerID",
                "size": 5
            }
        }
    }
}

// get the top 5 customers with the least transactions in the ecommerce_data index
GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "top_5_customers": {
            "terms": {
                "field": "CustomerID",
                "size": 5,
                "order": {
                    "_count": "asc"
                }
            }
        }
    }
}

GET ecommerce_data/_mapping

GET ecommerce_data/_search
{
    "size": 0,
    "aggs": {
        "transactions_by_day": {
            "date_histogram": {
                "field": "InvoiceDate",
                "calendar_interval": "1d",
                "order": {
                    "daily_revenue": "desc"
                }
            },
            "aggs": {
                "daily_revenue": {
                    "sum": {
                        "script": {
                            "source": "doc['UnitPrice'].value * doc['Quantity'].value"
                        }
                    }
                },
                "total_unique_customers": {
                    "cardinality": {
                        "field": "CustomerID"
                    }
                }
            }
        },
        "transactions_by_country": {
            "terms": {
                "field": "Country",
                "order": {
                    "_count": "asc"
                }
                // "order": {
                //     "total_revenue": "desc"
                // }
            },
            "aggs": {
                "total_revenue": {
                    "sum": {
                        "script": {
                            "source": "doc['UnitPrice'].value * doc['Quantity'].value"
                        }
                    }
                }
            }
        }
    }
}