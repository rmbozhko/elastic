PUT products
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "manufacturer": {
        "type": "object",
        "properties": {
          "name": {
            "type": "keyword"
          },
          "country": {
            "type": "keyword"
          }
        }
      }
    }
  }
}

POST products/_doc
{
  "title": "MacBook Pro",
  "manufacturer": {
    "name": "Apple",
    "country": "USA"
  }
}

DELETE /products


GET products/_mapping

POST products/_doc
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

GET products/_search

PUT products/_doc/HdXq46EBwwmS6a61I7er
{
    "title": "MacBook Pro",
    "offers": [
        {
            "seller": "Amazon",
            "price": 1800
        },
        {
            "seller": "Amazon",
            "price": 2000
        },
        {
            "seller": "Amazon",
            "price": 1300
        },
        {
            "seller": "eBay",
            "price": 1500
        }
    ]
}

GET products/_search
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

DELETE products

PUT products
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "offers": {
        "type": "nested",
        "properties": {
          "seller": {
            "type": "keyword"
          },
          "price": {
            "type": "long"
          }
        }
      }
    }
  }
}

GET products/_search
{
    "query": {
        "nested": {
            "path": "offers",
            "inner_hits": {
                "name": "matching_offers",
                "size": 5
            },
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "offers.seller": "Amazon"
                            }
                        },
                        {
                            "range": {
                                "offers.price": {
                                    "gt": 1500,
                                    "lte": 2000
                                }
                            }
                        }
                    ]
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

PUT bug_reports
{
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
    "error_code": "PAYMENT_001",
    "timestamp": "2026-11-16T15:29:04"
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
  "query": {
    "term": {
      "metadata": "payment"
    }
  }
}

GET bug_reports/_search
{
  "query": {
    "range": {
      "metadata.price": {
        "gt": 100
      }
    }
  }
}

// curl -X POST 'http://localhost:9200/bug_reports/_bulk' -H 'Content-Type: application/x-ndjson' --data-binary @bug-reports-bulk.json

GET bug_reports/_search
{
    "size": 0,
    "aggs": {
        "by_priority": {
            "terms": {
                "field": "metadata.priority"
            },
            "aggs": {
                "by_env": {
                    "terms": {
                        "field": "metadata.environment"
                    }
                }
            }
        }
    }
}
