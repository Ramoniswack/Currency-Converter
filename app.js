const BASE_URL = "https://v6.exchangerate-api.com/v6/ce27eac85908e89e55f0c491/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("#Exchange-rate");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
// for (code in countryList)
// {
//     console.log(code, countryList[code]) ;

// }

let i=0;

for( let select of dropdowns)
{
    for( currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;

        if(select.name == "from" && currCode == "USD")
        {
            newOption.selected = "selected";
        } else if (select.name == "to" && currCode == "NPR")
        {
            newOption.selected = "selected";

        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>
    {
        updateFlag(evt.target);
    })
}


const updateFlag = (element) =>
{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=  element.parentElement.querySelector("img");
    img.src = newSrc;

}

button.addEventListener("click", async (evt) =>
{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1)
    {
        amtVal = 1;
        amount.value= "1";
    } 


    const URL = `${BASE_URL}/${fromCurr.value}`;
    try{
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.conversion_rates[toCurr.value];
        let finalAmount = (amtVal *rate).toFixed(2);
        document.querySelector(".result").innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch(err)

    {
        console.log("Error:", err);
        document.querySelector(".result").innerText = "Conversion failed!";
    }
 

})