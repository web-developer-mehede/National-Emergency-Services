
const getInnerValue = (id) => {
  return parseInt(document.getElementById(id).innerText);
};

const getInnerText = (id) => {
  return document.getElementById(id).innerText;
};

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

const getElem = (id) => {
  return document.getElementById(id);
};


const heartCount = () => {
  const heartCounts = getInnerValue("nav-heart") + 1;
  // console.log(heartCounts);
  setInnerText("nav-heart", heartCounts);
};

const allButtons = document.querySelectorAll(".heartIcon");

for (const button of allButtons) {
  button.addEventListener("click", function () {
    heartCount();
    // console.log(button.parentNode);
  });
}


const callingInformation = [];

// callStatus Function
const checkCallingStatus = (callButton, value) => {
  if (value >= 20) {
    const parentDiv = callButton.parentElement.parentElement;
    const serviceName = parentDiv.querySelector("p").innerText;
    const emergencyHotLineNumber = parentDiv.querySelector("h1").innerText;

    const callingInfo = {
      serviceName: serviceName,
      emergencyHotLineNumber: emergencyHotLineNumber,
      time: new Date().toLocaleTimeString(),
    };

    callingInformation.push(callingInfo);

    const updateValue = value - 20;
    setInnerText("nav-coin", updateValue);
    alert(`📞 Calling ${serviceName} ${emergencyHotLineNumber}...`);
    return callingInfo;
  } 
  else {
    alert(
      "❌ You have insufficient coin, to make call at least 20 coins required"
    );
    return;
  }
};

const callButtons = document.querySelectorAll(".btn");
for (const callButton of callButtons) {
  callButton.addEventListener("click", function () {
    const availCoin = getInnerValue("nav-coin");
    const callData = checkCallingStatus(callButton, availCoin);

    if (availCoin >= 20) {
      const div = document.createElement("div");
      div.setAttribute("class", "callHistory");
      div.innerHTML = `

      <div class="flex justify-between items-center mx-3 sm:mx-5 p-4 my-2 text-sm sm:text-base bg-[#fafafa]">
        <div>
            <h1 class="mb-1 font-medium">${callData.serviceName}</h1>
            <p class="text-[#5c5c5c] text-xs">${callData.emergencyHotLineNumber}</p>
        </div>
        <div>
            <p class="text-[#111111] text-xs">${callData.time}</p>
        </div>
      </div>

    `;
      getElem("callHistorySection").appendChild(div);
    }
  });
}

getElem("clearButton").addEventListener("click", function () {
  const divs = document.querySelectorAll(".callHistory");
  for (const div of divs) {
    div.remove();
  }
});


const copyCount = () => {
  const copyCounts = getInnerValue("nav-copy") + 1;
  // console.log(heartCounts);
  setInnerText("nav-copy", copyCounts);
};

const allCopyButtons = document.querySelectorAll(".copyBtn");

for (const button of allCopyButtons) {
  button.addEventListener("click", function () {
    copyCount();
    // console.log(button.parentNode);
    const hotLineNumber =
      button.parentNode.parentNode.querySelector("h1").innerText;
    console.log(hotLineNumber);
    navigator.clipboard
      .writeText(hotLineNumber)
      .then(() => {
        alert(`Number has been copied: ${hotLineNumber}`);
      })
      .catch(() => {
        alert("An error has been occurred named: " + err);
      });
  });
}
