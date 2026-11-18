PUT products_object/_doc/1
{
  "title": "MacBook Pro",
  "offers": [
    {
      "seller": "Amazon",
      "price": 1800
    },
    {
      "seller": "eBay",
      "price": 1500
    }
  ]
}

GET products_object/_mapping

// Exercise 1
GET products_object/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "offers.seller": "Amazon"
                    }
                },
                {
                    "range": {
                        "offers.price": {
                            "lt": 1600
                        }
                    }
                }
            ]
        }
    }
}

PUT products_nested
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "offers": {
                "type": "nested",
                "properties": {
                    "price": {
                        "type": "long"
                    },
                    "seller": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    }
                }
            },
            "title": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            }
        }
    }
}

PUT products_nested/_doc/1
{
  "title": "MacBook Pro",
  "offers": [
    {
      "seller": "Amazon",
      "price": 1800
    },
    {
      "seller": "eBay",
      "price": 1500
    }
  ]
}

GET products_nested/_mapping

// Exercise 2
GET products_nested/_search
{
    "query": {
        "nested": {
            "path": "offers",
            "inner_hits": {
                "name": "matched_offers"
            },
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "offers.seller": "Amazon"
                            }
                        },
                        {
                            "range": {
                                "offers.price": {
                                    "lt": 2000
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}

PUT marketplace
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "offers": {
                "type": "nested",
                "properties": {
                    "delivery": {
                        "properties": {
                            "country": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            },
                            "days": {
                                "type": "long"
                            }
                        }
                    },
                    "is_available": {
                        "type": "boolean"
                    },
                    "price": {
                        "type": "long"
                    },
                    "seller": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    }
                }
            },
            "title": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            }
        }
    }
}

PUT marketplace/_doc/1
{
    "title": "iPhone 17",
    "offers": [
        {
            "seller": "Amazon",
            "price": 950,
            "is_available": true,
            "delivery": {
                "country": "Germany",
                "days": 2
            }
        },
        {
            "seller": "eBay",
            "price": 850,
            "is_available": true,
            "delivery": {
                "country": "Poland",
                "days": 5
            }
        },
        {
            "seller": "BestBuy",
            "price": 1100,
            "is_available": false,
            "delivery": {
                "country": "Germany",
                "days": 3
            }
        }
    ]
}

PUT marketplace/_doc/2
{
    "title": "Samsung Galaxy S25",
    "offers": [
        {
            "seller": "Amazon",
            "price": 899,
            "is_available": true,
            "delivery": {
                "country": "Austria",
                "days": 1
            }
        },
        {
            "seller": "eBay",
            "price": 820,
            "is_available": true,
            "delivery": {
                "country": "France",
                "days": 4
            }
        }
    ]
}

PUT marketplace/_doc/3
{
    "title": "Sony WH-1000XM6",
    "offers": [
        {
            "seller": "BestBuy",
            "price": 399,
            "is_available": true,
            "delivery": {
                "country": "UK",
                "days": 3
            }
        },
        {
            "seller": "Amazon",
            "price": 379,
            "is_available": false,
            "delivery": {
                "country": "Poland",
                "days": 2
            }
        }
    ]
}

PUT marketplace/_doc/4
{
    "title": "iPad Air",
    "offers": [
        {
            "seller": "Amazon",
            "price": 649,
            "is_available": true,
            "delivery": {
                "country": "France",
                "days": 2
            }
        },
        {
            "seller": "BestBuy",
            "price": 699,
            "is_available": true,
            "delivery": {
                "country": "Belgium",
                "days": 5
            }
        }
    ]
}

PUT marketplace/_doc/5
{
    "title": "Nintendo Switch 2",
    "offers": [
        {
            "seller": "eBay",
            "price": 449,
            "is_available": true,
            "delivery": {
                "country": "Turkey",
                "days": 2
            }
        },
        {
            "seller": "Amazon",
            "price": 469,
            "is_available": true,
            "delivery": {
                "country": "Poland",
                "days": 3
            }
        }
    ]
}

PUT marketplace/_doc/6
{
    "title": "Dell XPS 13",
    "offers": [
        {
            "seller": "BestBuy",
            "price": 1299,
            "is_available": false,
            "delivery": {
                "country": "France",
                "days": 6
            }
        },
        {
            "seller": "Amazon",
            "price": 1249,
            "is_available": true,
            "delivery": {
                "country": "Germany",
                "days": 4
            }
        }
    ]
}



GET marketplace/_search

// Exercise 3
GET marketplace/_search
{
    "query": {
        "nested": {
            "path": "offers",
            "inner_hits": {
                "name": "matched_offers"
            },
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "offers.seller.keyword": "Amazon"
                            }
                        },
                        {
                            "range": {
                                "offers.price": {
                                    "lt": 1000
                                }
                            }
                        },
                        {
                            "term": {
                                "offers.is_available": true
                            }
                        },
                        {
                            "term": {
                                "offers.delivery.country.keyword": "Germany"
                            }
                        },
                        {
                            "range": {
                                "offers.delivery.days": {
                                    "lte": 3
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}

// Exercise 4

GET marketplace/_search
{
    "size": 0,
    "aggs": {
        "offers_aggs": {
            "nested": {
                "path": "offers"
            },
            "aggs": {
                "avg_offer_price": {
                    "avg": {
                        "field": "offers.price"
                    }
                },
                "by_seller": {
                    "terms": {
                        "field": "offers.seller.keyword"
                    },
                    "aggs": {
                        "avg_price_by_seller": {
                            "avg": {
                                "field": "offers.price"
                            }
                        }
                    }
                },
                "available_offers_only": {
                    "filter": {
                        "term": {
                            "offers.is_available": true
                        }
                    },
                    "aggs": {
                        "by_seller": {
                            "terms": {
                                "field": "offers.seller.keyword"
                            }
                        }
                    }
                }
            }
        }
    }
}


// Exercise 5

GET recipes/_mapping

GET recipes/_search
{
    "query": {
        "nested": {
            "path": "feedback",
            "inner_hits": {
                "name": "feedback_matches"
            },
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "feedback.stars_count": 4
                            }
                        },
                        {
                            "range": {
                                "feedback.updated_at": {
                                    "lt": "2026-11-01"
                                }
                            }
                        },
                        {
                            "nested": {
                                "path": "feedback.comments",
                                "inner_hits": {
                                    "name": "feedback.comments_matches"
                                },
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "term": {
                                                    "feedback.comments.author.keyword": "Filipo"
                                                }
                                            },
                                            {
                                                "match": {
                                                    "feedback.comments.text": "nona"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}

// Exercise 6

PUT bug_reports
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "title": {
                "type": "text"
            },
            "metadata": {
                "type": "flattened"
            }
        }
    }
}

PUT bug_reports/_doc/1
{
    "title": "Payment processing error",
    "metadata": {
        "priority": "high",
        "environment": "production",
        "service": "payment",
        "region": "eu-west-1",
        "error_code": "PAYMENT_001"
    }
}

PUT bug_reports/_doc/2
{
  "title": "Database connection timeout",
  "metadata": {
    "priority": "medium",
    "environment": "staging",
    "service": "database",
    "database": "postgresql",
    "retry_count": 5
  }
}

PUT bug_reports/_doc/3
{
  "title": "Search indexing failure",
  "metadata": {
    "priority": "high",
    "environment": "production",
    "service": "search",
    "cluster": "prod-us-east-1",
    "error_code": "SEARCH_023",
    "retry_count": 3
  }
}

PUT bug_reports/_doc/4
{
  "title": "Authentication latency spike",
  "metadata": {
    "priority": "low",
    "environment": "dev",
    "service": "auth",
    "team": "platform",
    "latency_ms": 850,
    "region": "eu-central-1"
  }
}

PUT bug_reports/_doc/5
{
  "title": "Cache invalidation issue",
  "metadata": {
    "priority": "medium",
    "environment": "production",
    "service": "cache",
    "region": "us-west-2",
    "cache_cluster": "redis",
    "error_code": "CACHE_104"
  }
}

GET bug_reports/_search
{
    "query": {
        "term": {
            "metadata.priority": "high"
        }
    }
}

GET bug_reports/_search
{
    "query": {
        "term": {
            "metadata.service": "database"
        }
    }
}

GET bug_reports/_search
{
    "query": {
        "term": {
            "metadata": "production"
        }
    }
}

GET bug_reports/_search
{
    "size": 0,
    "aggs": {
        "by_service": {
            "terms": {
                "field": "metadata.service"
            }
        }
    }
}

PUT user__attrs_object/_doc/1
{
    "user_id": 101,
    "attributes": {
        "favorite_color": "blue",
        "preferred_language": "English",
        "subscription_type": "premium"
    }
}

PUT user__attrs_object/_doc/2
{
    "user_id": 102,
    "attributes": {
        "favorite_game": "Chess",
        "country": "Ukraine",
        "marketing_source": "Instagram"
    }
}

GET user__attrs_object/_mapping

PUT user_attrs_flattened
{
    "mappings": {
        "properties": {
            "user_id": {
                "type": "long"
            },
            "attributes": {
                "type": "flattened"
            }
        }
    }
}

PUT user_attrs_flattened/_doc/1
{
    "user_id": 101,
    "attributes": {
        "favorite_color": "blue",
        "preferred_language": "English",
        "subscription_type": "premium"
    }
}

PUT user_attrs_flattened/_doc/2
{
    "user_id": 102,
    "attributes": {
        "favorite_game": "Chess",
        "country": "Ukraine",
        "marketing_source": "Instagram"
    }
}

GET user_attrs_flattened/_mapping

GET _cat/indices/user_attrs_flattened

GET _cat/indices/user__attrs_object

// Exercise 8
DELETE e_commerce

PUT e_commerce
{
    "mappings": {
        "properties": {
            "manufacturer": {
                "properties": {
                    "country": {
                        "type": "keyword" // selectbox with countries' names
                    },
                    "name": {
                        "type": "keyword" // user can select the manufacturer from a list
                    }
                }
            },
            "metadata": {
                "type": "flattened" // arbitrary fields
            },
            "offers": {
                "type": "nested" // need to keep relations between offers fields
            },
            "product_id": {
                "type": "long"
            },
            "specifications": {
                "properties": {
                    "ram": {
                        "type": "long"
                    },
                    "storage": {
                        "type": "long"
                    },
                    "gpu": {
                        "type": "keyword"
                    }
                }
            },
            "title": {
                "type": "text"
            }
        }
    }
}

PUT e_commerce/_doc/1
{
    "product_id": 101,
    "title": "Gaming Laptop",
    "manufacturer": {
        "name": "Asus",
        "country": "Taiwan"
    },
    "specifications": {
        "ram": 32,
        "storage": 1024,
        "gpu": "RTX 5070"
    },
    "offers": [
        {
            "seller": "Amazon",
            "price": 1800,
            "available": true
        },
        {
            "seller": "eBay",
            "price": 1650,
            "available": false
        }
    ],
    "metadata": {
        "campaign": "Black Friday",
        "source": "Google Ads",
        "custom_attribute_1": "value1",
        "custom_attribute_2": "value2"
    }
}

PUT e_commerce/_doc/2
{
    "product_id": 102,
    "title": "Smartphone",
    "manufacturer": {
        "name": "Samsung",
        "country": "South Korea"
    },
    "specifications": {
        "ram": 12,
        "storage": 256,
        "gpu": "Adreno 740",
        "battery": "5000mAh"
    },
    "offers": [
        {
            "seller": "BestBuy",
            "price": 899,
            "available": true
        },
        {
            "seller": "Walmart",
            "price": 879,
            "available": true
        }
    ],
    "metadata": {
        "campaign": "Spring Sale",
        "source": "Instagram",
        "custom_attribute_3": "promo",
        "custom_attribute_4": "vip"
    }
}

PUT e_commerce/_doc/3
{
    "product_id": 103,
    "title": "4K Monitor",
    "manufacturer": {
        "name": "Dell",
        "country": "USA"
    },
    "specifications": {
        "resolution": "3840x2160",
        "refresh_rate": 144,
        "panel": "IPS",
        "color": "HDR"
    },
    "offers": [
        {
            "seller": "Newegg",
            "price": 699,
            "available": true
        },
        {
            "seller": "Amazon",
            "price": 749,
            "available": false
        }
    ],
    "metadata": {
        "campaign": "Back to School",
        "source": "Email",
        "custom_attribute_5": "bundle",
        "custom_attribute_6": "reviewed"
    }
}

// Write a query to find products with an available offer below 1700.
GET e_commerce/_search
{
    "query": {
        "nested": {
            "path": "offers",
            "inner_hits": {},
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "offers.available": true
                            }
                        },
                        {
                            "range": {
                                "offers.price": {
                                    "lt": 1700
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}

// Write a query to find products with at least 32 GB RAM.
GET e_commerce/_search
{
    "query": {
        "range": {
            "specifications.ram": {
                "gte": 1
            }
        }
    }
}

// Write a query to find products with Black Friday offers.
GET e_commerce/_search
{
    "query": {
        "term": {
            "metadata": "Black Friday"
        }
    }
}

// Write an aggregation grouping products by manufacturer country.
GET e_commerce/_search
{
    "size": 0,
    "aggs": {
        "by_country": {
            "terms": {
                "field": "manufacturer.country"
            }
        }
    }
}

// Write a nested aggregation grouping available offers by seller.
GET e_commerce/_search
{
    "size": 0,
    "aggs": {
        "offers_aggs": {
            "nested": {
                "path": "offers"
            },
            "aggs": {
                "by_seller": {
                    "terms": {
                        "field": "offers.seller.keyword"
                    }
                }
            }
        }
    }
}

GET e_commerce/_mapping