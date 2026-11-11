PUT complex_core_field_types-idx-000001/_doc/1
{
    "tag": [
        "search",
        "nosql"
    ]
}

GET complex_core_field_types-idx-000001/_mappings

GET complex_core_field_types-idx-000001/_doc/1

GET complex_core_field_types-idx-000001/_search
{
    "query": {
        "match": {
            "tag": "search"
        }
    }
}

PUT complex_core_field_types-idx-000001/_doc/2
{
    "null_value": null,
    "empty_array": [],
    "array_with_null_value": [ null ]
}

GET complex_core_field_types-idx-000001/_doc/2

PUT complex_core_field_types-idx-000001/_doc/3
{
    "some_value": [
        42,
        43,
        44            
    ]
}

PUT complex_core_field_types-idx-000002/_doc/1
{
    "tweet": "Elasticsearch is very flexible",
    "user": {
        "id": "@johnsmith",
        "gender": "male",
        "age": 26,
        "name": {
            "full": "John Smith",
            "first": "John",
            "last": "Smith"
        }
    }
}

GET complex_core_field_types-idx-000002/_mappings

GET complex_core_field_types-idx-000002/_doc/1

PUT complex_core_field_types-idx-000003/_doc/1
{
    "followers": [
        { "age": 35, "name": "Mary White"},
        { "age": 26, "name": "Alex Jones"},
        { "age": 19, "name": "Lisa Smith"}
    ]
}

GET complex_core_field_types-idx-000003/_mappings

GET complex_core_field_types-idx-000003/_doc/1

GET complex_core_field_types-idx-000003/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "followers.age": 36
                    }
                },
                {
                    "match_phrase": {
                        "followers.name": "Alex Jones"
                    }
                }
            ]
        }
    }
}

PUT complex_core_field_types-idx-000004/_doc/1
{
    "title": "Nest eggs",
    "body": "Making your money work...",
    "tags": [
        "cash",
        "shares"
    ],
    "comments": [
        {
            "name": "John Smith",
            "comment": "Great article",
            "age": 28,
            "stars": 4,
            "date": "2014-09-01"
        },
        {
            "name": "Alice White",
            "comment": "More like this please",
            "age": 31,
            "stars": 5,
            "date": "2014-10-22"
        }
    ]
}

GET complex_core_field_types-idx-000004/_mappings

GET complex_core_field_types-idx-000004/_doc/1

GET complex_core_field_types-idx-000004/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "comments.name": "Alice"
                    }
                },
                {
                    "match": {
                        "comments.age": 28
                    }
                }
            ]
        }
    }
}

// DELETE complex_core_field_types-idx-000005

PUT complex_core_field_types-idx-000005
{
    "mappings": {
        "properties": {
            "body": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "comments": {
                "type": "nested",
                "properties": {
                    "age": {
                        "type": "long"
                    },
                    "comment": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    },
                    "date": {
                        "type": "date"
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
                    "stars": {
                        "type": "long"
                    }
                }
            },
            "tags": {
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

GET complex_core_field_types-idx-000005/_mappings

PUT complex_core_field_types-idx-000005/_doc/1
{
    "title": "Nest eggs",
    "body": "Making your money work...",
    "tags": [
        "cash",
        "shares"
    ],
    "comments": [
        {
            "name": "Alice White",
            "comment": "More like this please",
            "age": 31,
            "stars": 5,
            "date": "2014-10-22"
        },
        {
            "name": "John Smith",
            "comment": "Great article",
            "age": 28,
            "stars": 4,
            "date": "2014-09-01"
        }
    ]
}

GET complex_core_field_types-idx-000005/_doc/1

GET complex_core_field_types-idx-000005/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "title": "eggs"
                    }
                },
                {
                    "nested": {
                        "path": "comments",
                        "score_mode": "max",
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                        "match": {
                                            "comments.name": "john"
                                        }
                                    },
                                    {
                                        "match": {
                                            "comments.age": 28
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

PUT /complex_core_field_types-idx-000005/_doc/2
{
    "title": "Investment secrets",
    "body": "What they don't tell you ...",
    "tags": [ "shares", "equities" ],
    "comments": [
        {
            "name": "Mary Brown",
            "comment": "Lies, lies, lies",
            "age": 42,
            "stars": 1,
            "date": "2014-10-18"
        },
        {
            "name": "John Smith",
            "comment": "You're making it up!",
            "age": 28,
            "stars": 2,
            "date": "2014-10-16"
        }
    ]
}

PUT /complex_core_field_types-idx-000005/_doc/3
{
    "title": "Investment secrets",
    "body": "Secrets of the investment world ...",
    "tags": [ "shares", "etf" ],
    "comments": [
        {
            "name": "Jake Black",
            "comment": "What a load of rubbish",
            "age": 41,
            "stars": 1,
            "date": "2015-09-18"
        },
        {
            "name": "Mike Palmer",
            "comment": "Stop making it up!",
            "age": 27,
            "stars": 3,
            "date": "2015-09-16"
        }
    ]
}

GET /complex_core_field_types-idx-000005/_doc/3

GET /complex_core_field_types-idx-000005/_mappings

GET /complex_core_field_types-idx-000005/_search
{
    "query": {
        "nested": {
            "path": "comments",
            "query": {
                "range": {
                    "comments.date": {
                        "gte": "2014-10-01",
                        "lt": "2014-11-01"
                    }
                }
            }
        }
    },
    "sort": [
        {
            "comments.stars": {
                "order": "asc",
                "mode": "min",
                "nested": {
                    "path": "comments",
                    "filter": {
                        "range": {
                            "comments.date": {
                                "gte": "2014-10-01",
                                "lt": "2014-11-01"
                            }
                        }
                    }
                }
            }
        }
    ]
}

GET /complex_core_field_types-idx-000005/_search
{
    "size": 0,
    "aggs": {
        "comments": {
            "nested": {
                "path": "comments"
            },
            "aggs": {
                "by_month": {
                    "date_histogram": {
                        "field": "comments.date",
                        "calendar_interval": "month",
                        "format": "yyyy-MM"
                    },
                    "aggs": {
                        "avg_stars": {
                            "avg": {
                                "field": "comments.stars"
                            }
                        }
                    }
                }
            }
        }
    }
}

GET /complex_core_field_types-idx-000005/_search
{
    "size": 0,
    "aggs": {
        "comments": {
            "nested": {
                "path": "comments"
            },
            "aggs": {
                "age_group": {
                    "histogram": {
                        "field": "comments.age",
                        "interval": 5
                    },
                    "aggs": {
                        "blogposts": {
                            "reverse_nested": {},
                            "aggs": {
                                "tags": {
                                    "terms": {
                                        "field": "tags.keyword"
                                    }
                                }
                            }
                        }
                    }
                },
                "by_stars": {
                    "terms": {
                        "field": "comments.stars"
                    },
                    "aggs": {
                        "starred_tags": {
                            "reverse_nested": {},
                            "aggs": {
                                "tags": {
                                    "terms": {
                                        "field": "tags.keyword"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}