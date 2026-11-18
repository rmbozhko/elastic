PUT /recipes

// curl -X POST 'http://localhost:9200/recipes/_bulk' -H 'Content-Type: application/x-ndjson' --data-binary @recipes-bulk.json

GET /recipes/_mapping

GET recipes/_doc/12

GET recipes/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "ingredients.name": "parmesan"
                    }
                },
                {
                    "range": {
                        "ingredients.amount": {
                            "gt": 100
                        }
                    }
                }
            ]
        }
    }
}

DELETE /recipes

PUT recipes
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "created": {
                "type": "date"
            },
            "description": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "ingredients": {
                "type": "nested",
                "properties": {
                    "amount": {
                        "type": "long"
                    },
                    "name": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "unit": {
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
            "preparation_time_minutes": {
                "type": "long"
            },
            "ratings": {
                "type": "float"
            },
            "servings": {
                "properties": {
                    "max": {
                        "type": "long"
                    },
                    "min": {
                        "type": "long"
                    }
                }
            },
            "steps": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
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

GET recipes/_mapping

GET recipes/_search
{
    "query": {
        "nested": {
            "path": "ingredients",
            "inner_hits": {
                "name": "ingredients_debug"
            },
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "ingredients.name": "parmesan"
                            }
                        },
                        {
                            "range": {
                                "ingredients.amount": {
                                    "gt": 100
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}

DELETE recipes

PUT recipes
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "created": {
                "type": "date"
            },
            "description": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "feedback": {
                "type": "nested",
                "properties": {
                    "comments": {
                        "properties": {
                            "author": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            },
                            "text": {
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
                    "stars_count": {
                        "type": "long"
                    },
                    "updated_at": {
                        "type": "date"
                    }
                }
            },
            "ingredients": {
                "type": "nested",
                "properties": {
                    "amount": {
                        "type": "long"
                    },
                    "name": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "unit": {
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
            "preparation_time_minutes": {
                "type": "long"
            },
            "ratings": {
                "type": "float"
            },
            "servings": {
                "properties": {
                    "max": {
                        "type": "long"
                    },
                    "min": {
                        "type": "long"
                    }
                }
            },
            "steps": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
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

// curl -X POST 'http://localhost:9200/recipes/_bulk' -H 'Content-Type: application/x-ndjson' --data-binary @recipes-bulk.json

GET recipes/_mapping

POST recipes/_update/21
{
    "doc": {
        "feedback": [
            {
                "stars_count": 5,
                "updated_at": "2026-11-16T11:01:10",
                "comments": [
                    {
                        "text": "Great recipe!",
                        "author": "Jakie"
                    },
                    {
                        "text": "Outstanding! Will definitely try at the weekend!",
                        "author": "Paula"
                    }
                ]
            },
            {
                "stars_count": 4,
                "updated_at": "2026-10-11T09:01:10",
                "comments": [
                    {
                        "text": "My nona used to make these. Reminded me of my chilhood in Italy.",
                        "author": "Filipo"
                    },
                    {
                        "text": "Have never seen anything like this. Looks tasty.",
                        "author": "Raven"
                    }
                ]
            },
            {
                "stars_count": 3,
                "updated_at": "2026-05-23T17:14:10",
                "comments": [
                    {
                        "text": "Good, burnt crust though!",
                        "author": "Joe"
                    },
                    {
                        "text": "Bad choice of accompanying beverage.",
                        "author": "Timmothy"
                    }
                ]
            },
            {
                "stars_count": 2,
                "updated_at": "2026-09-04T13:44:48",
                "comments": [
                    {
                        "text": "No way I am going to eat that!",
                        "author": "Peter"
                    },
                    {
                        "text": "Bad choice for vegans.",
                        "author": "Rachel"
                    }
                ]
            }
        ]
    }
}

GET recipes/_search
{
    "query": {
        "nested": {
            "path": "feedback",
            "inner_hits": {},
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
                                    "lt": "2026-11-01T09:00:00"
                                }
                            }
                        },
                        {
                            "match": {
                                "feedback.comments.author": "Filipo"
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
}


DELETE recipes

// curl -X POST 'http://localhost:9200/recipes/_bulk' -H 'Content-Type: application/x-ndjson' --data-binary @recipes-bulk.json

PUT recipes
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "created": {
                "type": "date"
            },
            "description": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "feedback": {
                "type": "nested",
                "properties": {
                    "comments": {
                        "type": "nested",
                        "properties": {
                            "author": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            },
                            "text": {
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
                    "stars_count": {
                        "type": "long"
                    },
                    "updated_at": {
                        "type": "date"
                    }
                }
            },
            "ingredients": {
                "type": "nested",
                "properties": {
                    "amount": {
                        "type": "long"
                    },
                    "name": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "unit": {
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
            "preparation_time_minutes": {
                "type": "long"
            },
            "ratings": {
                "type": "float"
            },
            "servings": {
                "properties": {
                    "max": {
                        "type": "long"
                    },
                    "min": {
                        "type": "long"
                    }
                }
            },
            "steps": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
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

GET recipes/_search
{
    "query": {
        "nested": {
            "path": "feedback",
            "inner_hits": {},
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
                                    "lt": "2026-11-01T09:00:00"
                                }
                            }
                        },
                        {
                            "nested": {
                                "path": "feedback.comments",
                                "inner_hits": {},
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "feedback.comments.author": "Filipo"
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