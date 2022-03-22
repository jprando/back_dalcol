module.exports = {
  scroll: '7s',
  size: 2,
  _source: false,
  query: {
    bool: {
      must: [],
      filter: [
        {
          range: {
            timestamp: {
              format: "strict_date_optional_time",
              gte: "2022-03-15T03:00:00.000Z",
              lte: "2022-03-22T03:42:06.079Z",
            },
          },
        },
      ],
      should: [],
      must_not: [],
    },
  },
  track_total_hits: false,
  sort: [
    {
      timestamp: {
        order: "desc",
        unmapped_type: "boolean",
      },
    },
  ],
  fields: [
    {
      field: "*",
      include_unmapped: "true",
    },
    {
      field: "@timestamp",
      format: "strict_date_optional_time",
    },
    {
      field: "timestamp",
      format: "strict_date_optional_time",
    },
    {
      field: "utc_time",
      format: "strict_date_optional_time",
    },
  ],
  version: true,
  script_fields: {},
  stored_fields: ["*"],
  runtime_mappings: {
    hour_of_day: {
      type: "long",
      script: {
        source: "emit(doc['timestamp'].value.getHour());",
      },
    },
  },
  highlight: {
    pre_tags: ["@kibana-highlighted-field@"],
    post_tags: ["@/kibana-highlighted-field@"],
    fields: {
      "*": {},
    },
    fragment_size: 2147483647,
  },
};
