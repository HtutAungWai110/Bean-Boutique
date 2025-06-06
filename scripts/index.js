const fetchUrl = "data/data.json"; //json file url
  export async function fetchData(){
    try{
    const res = await fetch(fetchUrl);
    //fetching data from data.json file
    const fetchedData = res.json();
    //formatting response into json format

    //Error handling
    if(!res.ok){
      throw new Error("Could not fetch resources!")
    //404 status data not found
    }
    return fetchedData;
    //Returning data
    }
    catch(error){
      console.error(error);
      displayErrorPopup(error);
      //catching errors and displaying them
    }
    
  }

    function displayErrorPopup (error){
    //Error popup function to display error occurance
    const popup  = document.querySelector(".overlay-popup");
    const closePopup = document.getElementById("closePopup"); 
    const errorMessage = document.querySelector(".error-message");
    //selecting html elements

    popup.style.visibility = "visible";
    popup.style.opacity = 1;

    //Displaying popup box if an error occurs

    errorMessage.textContent = error;

    //Adding eventlistener and passing closePopupBox function
    closePopup.addEventListener('click', () => 
        closePopupBox(popup))
  }

  function closePopupBox(popup){
    popup.style.opacity = 0;
    popup.addEventListener("transitionend", (e) => {
      e.target.style.visibility = "hidden"; //Setting visibility to hidden after transition
    })
    document.getElementById("closePopup").removeEventListener('click', closePopupBox) //Removes eventlistener after clicking
  }

  export async function filterData(target){
    //Data filtering function to filter data based on category
      const fetchedData = await fetchData();
      if (fetchedData === undefined){
        throw new Error ("Could not fectch resources")
      }
      const filteredData = await fetchedData.filter(item => 
        item.category === target //if item category matches, return current item 
      )
      if (filteredData.length === 0){
        throw new Error("Item not found!")//if an array is empty, 0 items is found
      }
      return filteredData;
  }