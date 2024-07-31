const axios = require('axios');

async function textGenerate(text) {
  console.log(text);
let data = JSON.stringify({
  "inputs": text
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer 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'
  },
  data : data
};


  try {
    const response = await axios.request(config);
    console.log("ans:",response);
    return response.data[0].generated_text;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = textGenerate;
