// high recall, more results, but less relevant
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

// high precision, fewer results, but more relevant
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

// fine-tuning precision and recall with minimum_should_match
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

GET /news_headlines/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Kardashian Jenner"
            }
        }
    }
}