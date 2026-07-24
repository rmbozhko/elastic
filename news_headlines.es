GET news_headlines/_search
{
    "track_total_hits": true,
    "query": {
        "range": {
            "date": {
                "gte": "2012-02-01",
                "lte": "2015-12-31"
            }
        }
    }
}

GET news_headlines/_search
{
    "track_total_hits": true,
    "query": {
        "match": {
            "authors": "Nina Golgowski"
        }
    }
}

GET news_headlines/_search
{
    "track_total_hits": true,
    "aggs": {
        "by_headline": {
            "terms": {
                "field": "authors",
                "size": 10
            }
        }
    }
}

GET news_headlines/_count

GET news_headlines/_mapping

GET news_headlines/_search
{
    "size": 0,
    "aggs": {
        "by_category": {
            "terms": {
                "field": "category",
                "size": 5
            }
        }
    }
}

GET news_headlines/_search
{
    "size": 0,
    "query": {
        "range": {
            "date": {
                "gte": "2016-02-01",
                "lte": "2016-02-05"
            }
        }
    },
    "aggs": {
        "by_date": {
            "terms": {
                "field": "date"
            }
        }
    }
}

GET /news_headlines/_search
{
    "size": 0,
    "query": {
        "term": {
            "category": "ENTERTAINMENT"
        }
    },
    "aggs": {
        "popular_in_entertainment": {
            "significant_text": {
                "field": "headline"
            }
        }
    }
}

// high recall
GET /news_headlines/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Khloe Kardashian Kendall Jenner"
            }
        }
    }
}

// high precision
GET /news_headlines/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Khloe Kardashian Kendall Jenner",
                "operator": "and" // by default, the operator is "or"
            }
        }
    }
}

GET /news_headlines/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Khloe Kardashian Kendall Jenner",
                "minimum_should_match": 3
            }
        }
    }
}

GET news_headlines/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Shape of You"
            }
        }
    }
}

GET news_headlines/_search
{
    "track_total_hits": true,
    "query": {
        "match_phrase": {
            "headline": {
                "query": "Shape of You"
            }
        }
    }
}

GET news_headlines/_search
{
    "query": {
        "multi_match":{
            "fields" : [
                "headline",
                "authors",
                "short_description"
                ],
            "query" : "Michelle Obama"
        }
    }
}

GET news_headlines/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "match": {
                        "headline": {
                            "query": "Michelle Obama",
                            "boost": 50 
                        }
                    }
                },
                {
                    "match": {
                        "authors": {
                            "query": "Michelle Obama",
                            "boost": 10
                        }
                    }
                },
                {
                    "match": {
                        "short_description": {
                            "query": "Michelle Obama",
                            "boost": 1
                        }
                    }
                }
            ]
        }
    }
}

//per-field boosting
GET news_headlines/_search
{
    "query": {
        "multi_match":{
            "fields" : [
                "headline^2",
                "authors",
                "short_description"
                ],
            "query" : "Michelle Obama"
        }
    }
}

GET news_headlines/_search
{
    "query": {
        "multi_match": {
            "fields" : [
                "headline^2",
                "short_description"
            ],
            "query" : "party planning",
            "type": "phrase"
        }
    }
}

// category: POLITICS
// created_at: lt "2016-01-01"
// match headline^2, short_description on "Michelle Obama" with phrase type
GET news_headlines/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "category": "POLITICS"
                    }
                },
                {
                    "range": {
                        "date": {
                            "lt": "2016-01-01"
                        }
                    }
                }
            ],
            "must": [
                {
                    "multi_match": {
                        "fields": [
                            "headline^2",
                            "short_description"
                        ],
                        "query": "Michelle Obama",
                        "type": "phrase"
                    }
                }
            ]
        }
    }
}

// get categories where Michelle Obama appears in the headline
GET news_headlines/_search
{
    "size": 0,
    "query": {
        "match_phrase":{
            "headline": {
                "query": "Michelle Obama"
            }
        }
    },
    "aggs": {
        "category_mentions": {
            "terms": {
                "field": "category"
            }
        }
    }
}

GET news_headlines/_search
{
    "query": {
        "bool": {
            "must_not": [
                {
                    "term": {
                        "category": "WEDDINGS"
                    }
                }
            ],
            "must": [
                {
                    "multi_match": {
                        "fields": [ "headline^2", "short_description" ],
                        "query": "Michelle Obama",
                        "type": "phrase"
                    }
                }
            ]
        }
    }
}

GET news_headlines/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "term": {
                        "category": {
                            "value": "BLACK VOICES",
                            "boost": 10
                        }
                    }
                }
            ],
            "must": [
                {
                    "multi_match": {
                        "fields": [ "headline^2", "short_description" ],
                        "query": "Michelle Obama",
                        "type": "phrase"
                    }
                }
            ]
        }
    }
}

GET news_headlines/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "range": {
                        "date": {
                            "gte": "2014-03-25",
                            "lte": "2016-03-25"
                        }
                    }
                }
            ],
            "must": [
                {
                    "multi_match": {
                        "fields": [
                            "headline^2",
                            "short_description"
                        ],
                        "query": "Michelle Obama",
                        "type": "phrase"
                    }
                }
            ]
        }
    }
}

// phrase "Michelle Obama" in headline^2, short_description
// boost:
// match short_description on "biography Becoming"
// match short_description on "women", "empower"
GET news_headlines/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "multi_match": {
                        "fields" : [
                            "headline^2",
                            "short_description"
                        ],
                        "query" : "Michelle Obama",
                        "type": "phrase"
                    }
                }
            ],
            "should": [
                {
                    "multi_match": {
                        "fields": [
                            "headline",
                            "short_description"
                        ],
                        "query": "biography Becoming",
                        "boost": 10
                    }
                },
                {
                    "multi_match": {
                        "fields": [
                            "headline",
                            "short_description"
                        ],
                        "query": "women empower",
                        "boost": 5
                    }
                }
            ]
        }
    }
}