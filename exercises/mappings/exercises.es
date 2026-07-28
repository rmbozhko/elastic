GET lego/_mappings


// Exercise 1: Design the mapping yourself

PUT lego_sets
{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
                "US_retailPrice": {
                    "type": "double"
                },
                "agerange_min": {
                    "type": "long"
                },
                "bricksetURL": {
                    "enabled": false
                },
                "category": {
                    "type": "keyword"
                },
                "imageURL": {
                    "enabled": false
                },
                "minifigs": {
                    "type": "long"
                },
                "name": {
                    "type": "text"
                },
                "pieces": {
                    "type": "long"
                },
                "set_id": {
                    "type": "keyword"
                },
                "subtheme": {
                    "type": "keyword"
                },
                "theme": {
                    "type": "keyword"
                },
                "themeGroup": {
                    "type": "keyword"
                },
                "thumbnailURL": {
                    "enabled": false
                },
                "year": {
                    "type": "long"
                },
                "in_production": {
                    "type": "boolean"
                }
            }
    }
}

POST _reindex
{
    "source": {
        "index": "lego"
    },
    "dest": {
        "index": "lego_sets"
    }
}

GET lego_sets/_mappings

// Exercise 2: Multi-fields
PUT lego_sets_v2
{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "US_retailPrice": {
                "type": "double"
            },
            "agerange_min": {
                "type": "long"
            },
            "bricksetURL": {
                "enabled": false
            },
            "category": {
                "type": "keyword"
            },
            "imageURL": {
                "enabled": false
            },
            "minifigs": {
                "type": "long"
            },
            "name": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                }
            },
            "pieces": {
                "type": "long"
            },
            "set_id": {
                "type": "keyword"
            },
            "subtheme": {
                "type": "keyword"
            },
            "theme": {
                "type": "keyword"
            },
            "themeGroup": {
                "type": "keyword"
            },
            "thumbnailURL": {
                "enabled": false
            },
            "year": {
                "type": "long"
            },
            "in_production": {
                "type": "boolean"
            }
        }
    }
}

POST _reindex
{
    "source": {
        "index": "lego_sets"
    },
    "dest": {
        "index": "lego_sets_v2"
    }
}

// Full-text search by name
GET lego_sets_v2/_search
{
    "query": {
        "match": {
            "name": "star destroyer"
        }
    }
}

GET lego_sets_v2/_mappings

// Top 10 most common names
GET lego_sets/_search
{
    "size": 0,
    "aggs": {
        "10_common_names": {
            "terms": {
                "field": "name.raw"
            }
        }
    }
}

DELETE lego_sets_v2

// Exercise 3: Text vs Keyword
GET lego_sets_v2/_search
{
    "query": {
        "term": {
            "theme": "Star Wars"
        }
    }
}

GET lego_sets_v2/_search
{
    "query": {
        "match": {
            "theme": "Star Wars"
        }
    }
}

// Execise 4: Dynamic Mapping
POST ex4_index/_doc
{
    "pieces": 1000,
    "theme": "City",
    "available": true,
    "price": 49.99
}

GET ex4_index/_mapping

GET ex4_index/_settings?include_defaults=true

// Exercise 5: Dynamic Mapping with strict mode
PUT ex5_index
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "dynamic": "strict",
        "properties": {
            "theme": {
                "type": "keyword"
            }
        }
    }
}

GET ex5_index/_settings?include_defaults=true

GET ex5_index/_mapping

// This will cause an error because the mapping is strict
POST ex5_index/_doc
{
    "theme": "Technic",
    "new_field": "This will cause an error because the mapping is strict"
}

// Exercise 6: Ignore malformed values
PUT ex6_index
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "price": {
                "type": "double"
            }
        }
    }
}

POST ex6_index/_doc
{
    "price": 49.99
}

POST ex6_index/_doc
{
    "price": "This is a string, not a double"
}

POST ex6_index/_mapping
{
    "properties": {
        "price": {
            "type": "double",
            "ignore_malformed": true
        }
    }
}

GET ex6_index/_mapping

GET ex6_index/_search
{
    "query": {
        "match_all": {}
    }
}

// malformed values will be ignored in the aggregation
GET ex6_index/_search
{
    "aggs": {
        "total_cost": {
            "sum": {
                "field": "price"
            }
        }
    }
}

// Exercise 7: Date Mapping
PUT ex7_index
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "release_date": {
                "type": "date",
                "format": "yyyy-MM-dd"
            }
        }
    }
}

POST ex7_index/_doc
{
    "release_date": "2024-01-12"
}

// It fails because the date format defined in index mapping is different from the one in the document.
POST ex7_index/_doc
{
    "release_date": "2024/01/12"
}

// Exercise 8: Arrays
POST ex8_index/_doc
{
    "themes": [
        "Star Wars",
        "Space"
    ]
}

GET ex8_index/_mapping

GET ex8_index/_search
{
    "query": {
        "match": {
            "themes": "Space"
        }
    }
}

// Exercise 9: Object fields
POST ex9_index/_doc
{
    "dimensions": {
        "height": 45,
        "width": 30,
        "depth": 20
    }
}

GET ex9_index/_mapping

GET ex9_index/_search
{
    "query": {
        "range": {
            "dimensions.height": {
                "gt": 40
            }
        }
    }
}

// Exercise 10: Nested fields
PUT ex10_index
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "reviews": {
                "type": "nested",
                "properties": {
                    "reviewer": {
                        "type": "keyword"
                    },
                    "rating": {
                        "type": "integer"
                    },
                    "comment": {
                        "type": "text"
                    }
                }
            }
        }
    }
}  

POST ex10_index/_doc
{
    "reviews": [
        {
            "reviewer": "John Doe",
            "rating": 5,
            "comment": "Excellent set!"
        },
        {
            "reviewer": "Jane Smith",
            "rating": 4,
            "comment": "Great, but a bit pricey."
        }
    ]
}

GET ex10_index/_mapping

GET ex10_index/_search
{
    "query": {
        "nested": {
            "path": "reviews",
            "query": {
                "bool": {
                    "must": [
                        { "match": { "reviews.reviewer": "John Doe" } },
                        { "range": { "reviews.rating": { "gte": 4 } } }
                    ]
                }
            }
        }
    }
}

// Exercise 11: Disable indexing

DELETE ex11_index

PUT ex11_index
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "name": {
                "type": "text"
            },
            "description": {
                "type": "text",
                "index": false
            },
            "price": {
                "enabled": false
            }
        }
    }
}

GET ex11_index/_mapping

POST ex11_index/_doc
{
    "name": "Millennium Falcon",
    "description": "A detailed model of the Millennium Falcon from Star Wars.",
    "price": 159.99
}

GET ex11_index/_search

GET ex11_index/_search
{
    "query": {
        "match": {
            "description": "model"
        }
    }
}

GET ex11_index/_search
{
    "query": {
        "range": {
            "price": {
                "lte": 500
            }
        }
    }
}

// Exercise 12: Runtime field

PUT lego_sets/_mapping
{
    "runtime": {
        "price_for_piece": {
            "type": "double",
            "script": {
                "source": "int pfp = 0; if (!doc['US_retailPrice'].isEmpty() && !doc['pieces'].isEmpty() && doc['US_retailPrice'].value > 0) { pfp = (double) doc['pieces'].value / doc['US_retailPrice'].value; } return pfp;"
            }
        }
    }
}

GET lego_sets

GET lego_sets/_search
{
    "sort": [
        {
            "price_per_piece": {
                "order": "asc"
            }
        }
    ]
}