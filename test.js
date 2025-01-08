exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
      try {
        // Process the GET request as needed
        const data = fetch('https://rt.data.gov.hk/v2/transport/citybus/eta/CTB/002745/26')
            .then((response) => response.json())
            .then((data) =>  data["data"].map((d, i) => ({
    i: Math.round((new Date(d["eta"]) - new Date(d["data_timestamp"])) / (60 * 1000))
}))
            );
  
        // Return the data as the response
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      } catch (error) {
        // Return an error response if there was an issue processing the request
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to process GET request' }),
        };
      }
    }
  };