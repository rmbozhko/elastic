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

GET complex_core_field_types-idx-000005/_doc/1

GET complex_core_field_types-idx-000005/_search
{
    "query": {
        "bool"
        "nested": {
            "path": "comments",
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
                                "comments.age": 31
                            }
                        }
                    ]
                }
            }
        }
    }
}