// first of all selecting all the input fields
const nameInput = document.querySelector(".name");

const author = document.querySelector(".author");
const description = document.querySelector(".description");
const imageUpload = document.querySelector(".image-upload");

const addBook = document.querySelector(".add-book");

const defaultImage = document.querySelector("#imagePreview");

const allInputFields = document.querySelectorAll(".form-control");
const radioBtns = document.querySelectorAll(".form-check-input");
const table = document.querySelector(".table");
const tableBody = document.querySelector(".table-body");

// also when page reloads we also have to retrieve the data from the local storage
// so, basically local storage functionality we'll implement tomorrow, so Keshav paaji Good night for today!!!!!!
// so first of all we need to check is there any data stored in the local storage previously, so first of all we need to fetch the data from the local storage
// so our key name is book info
// const storedBookDataInStorage = localStorage.getItem("bookInfo");
// // if no data is stored in the local storage then null would be printed
// console.log(storedBookDataInStorage);
// now we'll make an empty inputFields array,we'll set that array of objects inside our local storage
// problem is that when the page gets refreshed inputFieldsArr is always empty deleting the previous stored values in the localstorage
let inputFieldsArr = JSON.parse(localStorage.getItem("bookInfo") || "[]");

let count = inputFieldsArr.length + 1;
// showing data from localStorage to our UI
if (inputFieldsArr.length != 0) {
  // which means there are already some piece of data present in the local storage
  // console.log(inputFieldsArr);
  // applying for of loop
  for (const inputFieldsObj of inputFieldsArr) {
    const tableRow = document.createElement("tr");
    // creating the cells
    const c0 = document.createElement("td");
    const c1 = document.createElement("td");
    const c2 = document.createElement("td");
    const c3 = document.createElement("td");
    const c4 = document.createElement("td");
    const c5 = document.createElement("td");
    const c6 = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("class", "btn btn-danger");
    // console.dir(deleteBtn);
    c6.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", (e) => {
      // console.log("delete btn pressed");
      // calling the deleteRow function
      deleteRow(deleteBtn, inputFieldsArr);
    });
    // creating the imageElement as well
    const image = document.createElement("img");
    c0.innerText = `${inputFieldsObj.sno}`;
    c1.innerText = `${inputFieldsObj.name}`;
    c2.innerText = `${inputFieldsObj.author}`;
    c3.innerText = `${inputFieldsObj.description}`;
    c4.innerText = `${inputFieldsObj.type}`;
    image.src = `${inputFieldsObj.image}`;
    image.classList.add("image");
    c5.appendChild(image);
    tableRow.appendChild(c0);
    tableRow.appendChild(c1);
    tableRow.appendChild(c2);
    tableRow.appendChild(c3);
    tableRow.appendChild(c4);
    tableRow.appendChild(c5);
    tableRow.appendChild(c6);
    // append tableRow to the table body

    tableBody.appendChild(tableRow);
  }
}

// making the check function
const check = () => {
  // first of all converting the nodeList into the array
  // very good keshav paaji this feature is being successfully filled up by you
  const myInputFields = Array.from(allInputFields);
  // now this time I will use the map function to check weather all the necessary input fields are being filled by the user or not
  const myNewInputFields = myInputFields.map((el, index, array) => {
    // console.log(el.value);
    el = el.value;
    return el;
  });
  // return statement
  return myNewInputFields;
};

// emptyInputFields function
const emptyInputFields = () => {
  for (const allInputField of allInputFields) {
    allInputField.value = "";
  }
  // empty the image that is in the file input field
  defaultImage.src = "http://127.0.0.1:5500/";
};

const deleteRow = (deleteBtn, inputFieldsArr) => {
  // debugger
  // console.log('delete button pressed');
  // now when the delete button is being pressed we basically have to delete that row
  // now we'll make a separate function to implement the delete functionality

  // console.dir(deleteBtn);
  // console.log(inputFieldsArr);
  const td = deleteBtn.parentElement;
  const tr = td.parentElement;
  // console.dir(tr);
  // console.log(tr.innerHTML);
  // finally remove that particular row
  tr.remove();

  // now after the deleting the row from our UI,we have to delete that particular object from our local storage as well
  // so for deleting the data from local storage from inputFieldsArr, first of all we have to get data from local storage,

  // so we'll apply the filter method to delete the specific object
  const inputFieldsArrFiltered = inputFieldsArr.filter(
    (element, index, arr) => {
      // you have to write the correct condition
      if (tr.children[0].innerText === element.sno) {
        // remove it from the localstorage as well
        return inputFieldsArr.splice(index, 1);
        // console.log(inputFieldsArr);
        // return inputFieldsArr;
      }
      // console.log(tr.children[0].innerText);
      // console.log(element.sno);
    }
  );
  // console.log(inputFieldsArrFiltered);
  // console.log(inputFieldsArr);
  localStorage.setItem("bookInfo", JSON.stringify(inputFieldsArr));
  // resetting the count variable
  // count = inputFieldsArr.length + 1;
  // count = (inputFieldsArr + 1);
  // console.log(count);
  if(inputFieldsArr.length === 0) {
    // it means all the bookinfo is deleted
    // reset the count
    count = inputFieldsArr.length + 1;
  }
};

const insertTableRow = () => {
  const tableRow = document.createElement("tr");
  // creating the cells
  const c0 = document.createElement("td");
  const c1 = document.createElement("td");
  const c2 = document.createElement("td");
  const c3 = document.createElement("td");
  const c4 = document.createElement("td");
  const c5 = document.createElement("td");
  const c6 = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "delete";
  deleteBtn.setAttribute("class", "btn btn-danger");
  // console.dir(deleteBtn);
  c6.appendChild(deleteBtn);

  const storedBookDataInStorage = localStorage.getItem("bookInfo");
  if (storedBookDataInStorage) {
    inputFieldsArr = JSON.parse(storedBookDataInStorage);
    console.log(inputFieldsArr);
  }
  deleteBtn.addEventListener("click", (e) => {
    // console.log("delete btn pressed");
    // calling the deleteRow function
    deleteRow(deleteBtn, inputFieldsArr);
  });
  // creating an image element as well
  const image = document.createElement("img");
  // first of all we check that which radio button was checked by the user
  // so for this i am going to use the for of loop
  for (const radioBtn of radioBtns) {
    if (radioBtn.checked) {
      // means that radio btn is checked by the user
      // we have to access it's sibling now
      c4.innerText = radioBtn.nextElementSibling.innerText;

      break;
    }
  }
  // finally the time has come to set the image as well
  // first we set a default image if no image has been selected by the user
  // but if user selects any image then we 'll simply update the src of the image with the src of the image of the user

  // inserting data into the cells
  c0.innerText = count;
  c1.innerText = nameInput.value;
  c2.innerText = author.value;
  c3.innerText = description.value;

  if (
    defaultImage.src === "http://127.0.0.1:5500/" ||
    defaultImage.src === "http://127.0.0.1:5500/index.html"
  ) {
    // means user has not selected any
    // append the default image to the column
    image.src = "http://127.0.0.1:5500/default.webp";
    image.classList.add("image");
    c5.appendChild(image);
  } else {
    // user has selected some image
    // updating the src of the image
    image.src = defaultImage.src;
    image.classList.add("image");
    c5.appendChild(image);
  }
  // Append cells to row
  tableRow.appendChild(c0);
  tableRow.appendChild(c1);
  tableRow.appendChild(c2);
  tableRow.appendChild(c3);
  tableRow.appendChild(c4);
  tableRow.appendChild(c5);
  tableRow.appendChild(c6);
  // append tableRow to the table body

  tableBody.appendChild(tableRow);

  // ok after inserting the data we have to insert that data in the local storage as well

  const inputFieldsObj = {
    sno: `${count}`,
    name: `${nameInput.value}`,
    author: `${author.value}`,
    description: `${description.value}`,
    type: `${c4.innerText}`,
    image: `${image.src}`,
  };
  count++;
  // console.log(inputFieldsObj);
  // after we have got the object of inputFields filled up by the user, in those input fields user has basically fillled by their favourite book description
  // so now it is time to push that object into our inputFieldsArr
  inputFieldsArr.push(inputFieldsObj);
  // console.log(inputFieldsArr);
  // now we have to set this inputFieldsArr in our local storage as well
  // but for setting in local storage we have to stringify the inputFieldsArr
  localStorage.setItem("bookInfo", JSON.stringify(inputFieldsArr));
  //after the row has been inserted we have to empty the input fields completely
  //we'll implement a function for doing this
  //emptyInputFields();
  emptyInputFields();
};

addBook.addEventListener("click", (e) => {
  // console.log("add-book btn pressed");
  // now at first we check that weather user has filled all the input fields or not
  // calling check function
  // const myInputFields = Array.from(allInputFields);
  // console.log(myInputFields);
  const myNewInputFields = check();
  console.log(myNewInputFields);
  let flag = false;
  for (const inputField of myNewInputFields) {
    if (inputField) {
      // truthy value
      // which means all input fields are being filled up by the user
      flag = true;
    } else {
      flag = false;
      alert("please fill out all input fields");
      break;
    }
  }

  if (flag) insertTableRow();
});

function main() {
  const fileUploadElement = document.getElementById("fileUpload");
  const chosenFileElement = document.getElementById("chosen-file");
  const customUploadLabel = document.querySelector(".custom-upload");
  const imagePreview = document.getElementById("imagePreview");

  fileUploadElement.addEventListener("change", function () {
    displayImage(this.files[0]);
  });

  // Prevent default drag behaviors
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    customUploadLabel.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  // Highlight drop area when item is dragged over it
  ["dragenter", "dragover"].forEach((eventName) => {
    customUploadLabel.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    customUploadLabel.addEventListener(eventName, unhighlight, false);
  });

  // Handle dropped files
  customUploadLabel.addEventListener("drop", handleDrop, false);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(e) {
    customUploadLabel.style.borderColor = "#666"; // Change as necessary
  }

  function unhighlight(e) {
    customUploadLabel.style.borderColor = "#ccc";
  }

  function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    if (files.length) {
      fileUploadElement.files = files;
      displayImage(files[0]);
    }
  }

  function displayImage(file) {
    if (file && file.type.startsWith("image/")) {
      var reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
        chosenFileElement.textContent = file.name;
      };
      reader.readAsDataURL(file);
    } else {
      chosenFileElement.textContent = "No file chosen";
      imagePreview.style.display = "none";
    }
  }
}
main();
