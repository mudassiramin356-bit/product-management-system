    const imageInput =
    document.getElementById("image");

    const preview =
    document.getElementById("preview");

    const uploadIcon =
    document.getElementById("uploadIcon");

    const uploadText =
    document.getElementById("uploadText");

    let deleteCard = null;
    let currentEdit = null;

    // IMAGE PREVIEW

    imageInput.addEventListener("change", function(){

      const file = this.files[0];

      if(file){

        const reader = new FileReader();

        reader.onload = function(e){

          preview.src = e.target.result;
          preview.style.display = "block";

          uploadIcon.style.display = "none";
          uploadText.style.display = "none";

        };

        reader.readAsDataURL(file);

      }

    });

    // ADD PRODUCT

    function addProduct(){

      const name =
      document.getElementById("name").value;

      const price =
      document.getElementById("price").value;

      const category =
      document.getElementById("category").value;

      const description =
      document.getElementById("description").value;

      const files =
      imageInput.files;

      if(
        name === "" ||
        price === "" ||
        description === "" ||
        files.length === 0
      ){
        return;
      }

      let images = [];
      let loaded = 0;

      for(let i=0; i<files.length; i++){

        const reader =
        new FileReader();

        reader.onload = function(e){

          images.push(e.target.result);

          loaded++;

          if(loaded === files.length){

            createCard(
              name,
              price,
              category,
              description,
              images
            );

          }

        };

        reader.readAsDataURL(files[i]);

      }

    }

    // CREATE CARD

    function createCard(
      name,
      price,
      category,
      description,
      images
    ){

      const products =
      document.getElementById("products");

      let index = 0;

      const card =
      document.createElement("div");

      card.classList.add("card");

      card.innerHTML = `

        <div class="slider">

          <button class="slide-btn prev">
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          <img src="${images[0]}">

          <button class="slide-btn next">
            <i class="fa-solid fa-chevron-right"></i>
          </button>

        </div>

        <div class="card-content">

          <h3>${name}</h3>

          <div class="price">
            $${price}
          </div>

          <div class="category">
            ${category}
          </div>

          <p>${description}</p>

          <div class="actions">

            <button class="icon-btn edit-btn">
              <i class="fa-solid fa-pen"></i>
            </button>

            <button class="icon-btn more-btn">
              <i class="fa-solid fa-plus"></i>
            </button>

            <button class="icon-btn delete-btn">
              <i class="fa-solid fa-trash"></i>
            </button>

          </div>

        </div>

      `;

      // IMAGE SLIDER

      const img =
      card.querySelector("img");

      card.querySelector(".next")
      .onclick = function(){

        index++;

        if(index >= images.length){
          index = 0;
        }

        img.src = images[index];

      };

      card.querySelector(".prev")
      .onclick = function(){

        index--;

        if(index < 0){
          index = images.length - 1;
        }

        img.src = images[index];

      };

      // DELETE

      card.querySelector(".delete-btn")
      .onclick = function(){

        deleteCard = card;

        document.getElementById("alertBox")
        .style.display = "block";

      };

      // EDIT

      card.querySelector(".edit-btn")
      .onclick = function(){

        currentEdit = card;

        document.getElementById("editModal")
        .style.display = "flex";

        document.getElementById("editName")
        .value = name;

        document.getElementById("editPrice")
        .value = price;

        document.getElementById("editDescription")
        .value = description;

      };

      products.appendChild(card);

      clearForm();

    }

    // DELETE CONFIRM

    document.getElementById("confirmDelete")
    .onclick = function(){

      if(deleteCard){

        deleteCard.remove();

        closeAlert();

      }

    };

    function closeAlert(){

      document.getElementById("alertBox")
      .style.display = "none";

    }

    // SAVE EDIT

    function saveEdit(){

      const newName =
      document.getElementById("editName").value;

      const newPrice =
      document.getElementById("editPrice").value;

      const newDescription =
      document.getElementById("editDescription").value;

      currentEdit.querySelector("h3")
      .innerText = newName;

      currentEdit.querySelector(".price")
      .innerText = "$" + newPrice;

      currentEdit.querySelector("p")
      .innerText = newDescription;

      document.getElementById("editModal")
      .style.display = "none";

    }

    // SEARCH

    document.getElementById("search")
    .addEventListener("keyup", function(){

      const value =
      this.value.toLowerCase();

      const cards =
      document.querySelectorAll(".card");

      cards.forEach(card => {

        const text =
        card.innerText.toLowerCase();

        if(text.includes(value)){

          card.style.display = "block";

        }else{

          card.style.display = "none";

        }

      });

    });

    // CLEAR FORM

    function clearForm(){

      document.getElementById("name").value = "";

      document.getElementById("price").value = "";

      document.getElementById("description").value = "";

      imageInput.value = "";

      preview.style.display = "none";

      uploadIcon.style.display = "block";

      uploadText.style.display = "block";

    }