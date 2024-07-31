document.addEventListener("DOMContentLoaded", function() {
  // Event listeners for navigation buttons
  document.getElementById('summarize-option').addEventListener('click', function() {
    showSection('summarize-section');
    initializeSummarizeSection();
  });
  document.getElementById('Generate_text').addEventListener('click', function() {
    showSection('Generate_text-section');
    initializeTextGenerateSection();
  });

  // By default, show the summarize section
  showSection('summarize-section');
  initializeSummarizeSection();
});

function showSection(sectionId) {
  document.getElementById('summarize-section').style.display = 'none';
  document.getElementById('Generate_text-section').style.display = 'none';

  document.getElementById(sectionId).style.display = 'block';
}


function initializeSummarizeSection() {
  const textArea = document.getElementById("text_to_summarize");
  const submitButton = document.getElementById("submit-button");
  const summarizedTextArea = document.getElementById("summary");
  
  textArea.addEventListener("input", verifyTextLength);
  submitButton.addEventListener("click", submitData1);
  
  // First, we disable the submit button by default when the user loads the website.
  submitButton.disabled = true;
  
  // Next, we define a function called verifyTextLength(). This function will be called when the user enters something in the text area. It receives an event, called ‘e’ here
  function verifyTextLength(e) {
  
    // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
    const textarea = e.target;
  
    // Check if the text in the text area is the right length - between 200 and 100,000 characters
    if (textarea.value.length > 200 && textarea.value.length < 100000) {
      // If it is, we enable the submit button.
      submitButton.disabled = false;
    } else {
      // If it is not, we disable the submit button.
      submitButton.disabled = true;
    }
  }
  
  function submitData1() {
  
    // This is used to add animation to the submit button
    submitButton.classList.add("submit-button--loading");
  
    const text_to_summarize = textArea.value;
  
    // INSERT CODE SNIPPET FROM POSTMAN BELOW
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "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");
  
    const raw = JSON.stringify({
      "text_to_summarize": text_to_summarize
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    // Send the text to the server using fetch API
  
      // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
      fetch('/summarize', requestOptions)
        .then(response => response.text()) // Response will be summarized text
        .then(summary => {
          // Do something with the summary response from the back end API!
  
          // Update the output text area with new summary
          summarizedTextArea.value = summary;
  
          // Stop the spinning loading animation
          submitButton.classList.remove("submit-button--loading");
  
        })
        .catch(error => {
          console.log(error.message);
        });
  }
}


function initializeTextGenerateSection() {
  const textArea2 = document.getElementById("text_to_generate");
  const submitButton2 = document.getElementById("generate-button");
  const generatedTextArea = document.getElementById("generated_text");

  textArea2.addEventListener("input", verifyTextLength);
  submitButton2.addEventListener("click", submitData2);

  // First, we disable the submit button by default when the user loads the website.
  submitButton2.disabled = true;

  // Next, we define a function called verifyTextLength(). This function will be called when the user enters something in the text area. It receives an event, called ‘e’ here
  function verifyTextLength(e) {

    // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
    const textarea = e.target;

    // Check if the text in the text area is the right length - between 200 and 100,000 characters
    if (textarea.value.length > 3 && textarea.value.length < 100) {
      // If it is, we enable the submit button.
      submitButton2.disabled = false;
    } else {
      // If it is not, we disable the submit button.
      submitButton2.disabled = true;
    }
  }

  function submitData2() {

    // This is used to add animation to the submit button
    submitButton2.classList.add("submit-button--loading");

    const text_to_generate = textArea2.value;

    // INSERT CODE SNIPPET FROM POSTMAN BELOW
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "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");

    const raw = JSON.stringify({
      "text_to_generate": text_to_generate
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    // Send the text to the server using fetch API

      // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
      fetch('/generate', requestOptions)
        .then(response => response.text()) // Response will be summarized text
        .then(result => {
          // Do something with the summary response from the back end API!

          // Update the output text area with new summary
          generatedTextArea.value = result;

          // Stop the spinning loading animation
          submitButton2.classList.remove("submit-button--loading");

        })
        .catch(error => {
          console.log(error.message);
        });
   
  }
 
}
