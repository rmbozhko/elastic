PUT shakespeare

PUT shakespeare/_doc/1
{
    "type": "line",
    "line_id": 18122,
    "play_name": "As you like it",
    "speech_number": 19,
    "line_number": "5.1.28",
    "speaker": "TOUCHSTONE",
    "text_entry": "The fool doth think he is wise, but the wise man knows himself to be a fool."
}

GET shakespeare/_search
{
    "query": {
        "match_phrase": {"text_entry": "the fool doth think"}
    },
    "highlight": {
        "fields": {
            "text_entry": {}
        }
    }
}

GET shakespeare/_mappings


GET shakespeare/_search
{
    "query": {  
        "range": {
            "speech_number": {
                "gt": 5,
                "lt": 100
            }
        }
    }
}

DELETE shakespeare

// create the index
PUT shakespeare
{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 1
    },
    "mappings": {
        "properties": {
            "type": {"type": "keyword"},
            "line_id" : {"type": "integer"},
            "play_name" : {"type": "keyword"},
            "line_number": {"type": "keyword"},
            "speech_number" : {"type":  "integer"},
            "speaker" : {"type": "keyword"},
            "text_entry": {"type": "text"}
        }
    }
}

PUT shakespeare/_mappings
{
    "properties" : {
        "type": {"type": "keyword"},
        "line_id" : {"type": "integer"},
        "play_name" : {"type": "keyword"},
        "line_number": {"type": "keyword"},
        "speech_number" : {"type":  "integer"},
        "speaker" : {"type": "keyword"},
        "text_entry": {"type": "text"}
    }
}

GET shakespeare/_mappings

PUT shakespeare/_doc/1
{
    "type": "line",
    "line_id": 18122,
    "play_name": "As you like it",
    "speech_number": 19,
    "line_number": "5.1.28",
    "speaker": "TOUCHSTONE",
    "text_entry": "The fool doth think he is wise, but the wise man knows himself to be a fool."
}

PUT _ingest/pipeline/add-timestamp
{
    "description" : "Add a timestamp to each document",
    "processors" : [
        {
            "set" : {
                "field" : "_source.@timestamp",
                "value" : "{{_ingest.timestamp}}"
            }
        }
    ]
}

PUT shakespeare/_settings
{
    "index" : {
        "default_pipeline" : "add-timestamp"
    }
}



PUT shakespeare/_doc/2
{
    "type":"line",
    "line_id":18123,
    "play_name":"As you like it",
    "speech_number":19,
    "line_number":"5.1.29",
    "speaker":"TOUCHSTONE",
    "text_entry":"knows himself to be a fool. The heathen"
}

GET shakespeare/_doc/2


GET shakespeare/_search
{
    "query": {
        "range": {
            "@timestamp": {
                "gte": "now-1m"
            }
        }
    }
}

DELETE shakespeare

GET shakespeare/_count

GET shakespeare/_doc/107175

GET shakespeare/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "play_name": "Hamlet"
                    }
                }
            ],
            "must": [
                {
                    "match_phrase": {
                        "text_entry": "comedy"
                    }
                },
                {
                    "range": {
                        "speech_number": {
                            "gte": 10,
                            "lte": 200
                        }
                    }
                }
            ],
            "should": [
                {
                    "term": {
                        "speaker": "HAMLET"
                    }
                }
            ]
        }
    },
    "highlight": {
        "fields": {
            "text_entry": {}
        }
    }
}

// request to add a new document to the shakespeare index with a refresh parameter to make it searchable immediately 
POST shakespeare/_doc?refresh=true
{
    "type":"line",
    "line_id":18123,
    "play_name":"As you like it",
    "speech_number":19,
    "line_number":"5.1.29",
    "speaker":"TOUCHSTONE",
    "text_entry":"knows himself to be a fool. The heathen"
}


GET shakespeare/_search
{
    "size": 5,
    "sort": [
        {
            "play_name" : "asc"
        }
    ],
    "_source": [
        "play_name",
        "speaker"
    ]
}

// request to get the top 10 plays with the their speakers
GET /shakespeare/_search
{
    "size": 0,
    "aggs": {
        "by_play": {
            "terms": {
                "field": "play_name",
                "size": 10
            },
            "aggs": {
                "speaker_count": {
                    "cardinality": {
                        "field": "speaker"
                    }
                }
            }
        }
    }
}

// get the exact count of documents in the shakespeare index
GET /shakespeare/_count


// get the exact count of documents in the shakespeare index matching a specific query
GET /shakespeare/_search
{
    "track_total_hits": true,
    "query":{
        "bool":{
            "must" : [
                {
                    "match": {
                        "text_entry": "fool"
                    }
                }
            ]
        }
    }
}