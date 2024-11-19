let contentLoaded = false;

const editor = grapesjs.init({
  container: "#gjs", // Container where the editor is rendered
  height: "100vh",
  width: "90%",
  fromElement: true,
  storageManager: {
    type: "remote",
    autosave: false,
    autoload: true,
    stepsBeforeSave: 1,
    options: {
      remote: {
        headers: {}, // Custom headers for the remote storage request
        urlStore: `http://localhost/web-builder/php/save_page.php?page_id=${pageId}`, // Endpoint URL where to store data project
        urlLoad: `http://localhost/web-builder/php/load_page.php?page_id=${pageId}`, // Endpoint URL where to load data project
      },
    },
  },
  plugins: [
    "grapesjs-preset-webpage", // Add first plugin
    "gjs-blocks-basic", // Add second plugin
    "grapesjs-plugin-forms",
    "grapesjs-custom-code", // Add third plugin
    "grapesjs-component-countdown",
    "grapesjs-tabs",
    "grapesjs-tooltip",
    "grapesjs-tui-image-editor",
    "grapesjs-typed",
  ],

  // Define their options here in a single `pluginsOpts` object
  pluginsOpts: {
    "grapesjs-preset-webpage": {}, // Options for the first plugin
    "gjs-blocks-basic": {}, // Options for the second plugin
    "grapesjs-custom-code": {}, // Options for the third plugin
    "grpaesjs-plugin-forms": {},
  },
});





editor.on("load", function () {
  const blockManager = editor.BlockManager;

  // Block IDs
  const typedBlockId = "typed"; // Block ID for "typed" block
  const tabsBlockId = "tabs"; // Block ID for "tabs" block
  const extraCategory = "Extra"; // Desired category name

  // Function to move a block to a new category
  function moveBlockToCategory(blockId, category) {
    const block = blockManager.get(blockId);

    if (block) {
      // Remove the block from the Block Manager
      blockManager.remove(blockId);

      // Re-add the block with the new category
      blockManager.add(blockId, {
        ...block.attributes, // Retain original properties
        category: category, // Assign to the new category
      });
    }
  }

  // Move 'typed' and 'tabs' blocks to the 'Extra' category
  moveBlockToCategory(typedBlockId, extraCategory);
  moveBlockToCategory(tabsBlockId, extraCategory);
});

// Add save button to the 'options' panel
editor.Panels.addButton("options", {
  id: "save-button",
  className: "fa fa-solid fa-floppy-disk save-icon",
  command: "saveContent",
  attributes: { title: "Save HTML and CSS" },
});



// Add save button to the 'options' panel
editor.Panels.addButton("options", {
  id: "live-content",
  className: "fa fa-solid fa-upload",
  command: "liveContent",
  attributes: { title: "Live this Page" },
});




function saveContent() {
  startLoadingAnimation();
  editor.store();
  setTimeout(() => {
    showSuccessAnimation();
    console.log("Saved!!!");
  }, 1500);
}

function startLoadingAnimation() {
  const button = editor.Panels.getButton("options", "save-button");
  button.set("className", "fa fa-spinner fa-spin loading-icon"); // Add spinner class
}

function showSuccessAnimation() {
  const button = editor.Panels.getButton("options", "save-button");
  button.set("className", "fa fa-check checkmark-icon"); // Change icon to checkmark

  // Reset back to original icon after 1.5 seconds
  setTimeout(() => {
    button.set("className", "fa fa-solid fa-floppy-disk save-icon"); // Original save icon
  }, 1500);
}

function loadContent() {
  editor.load();
}


editor.Commands.add("saveContent", {
  run: function () {
    saveContent();
  },
});



let saveTimeout;
editor.on("update", function () {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveContent, 5000); // Save after 5-second delay
});

editor.on("update", function () {
  startLoadingAnimation();
});







// Get the Pages API
const pagesApi = editor.Pages;

// Add Page Button
const addPageBtn = document.getElementById("add-page");
const pageList = document.getElementById("pages-ul");

// Function to render the pages list
// Function to render the pages list
// Function to render the pages list
// Function to render the pages list
function renderPages() {
  pageList.innerHTML = ""; // Clear current list

  const pages = pagesApi.getAll(); // Get all pages

  // If there are pages, loop through and add them to the list
  if (pages.length > 0) {
    pages.forEach((page) => {
      const li = document.createElement("li");
      li.className = "page-item gjs-one-bg gjs-two-color gjs-four-color-h";
      li.innerHTML = `
        <span class="page-name" contenteditable="false">${page.getName()}</span>
        <ul class="sub-menu">
          <li class="menu-item edit-page gjs-one-bg gjs-two-color gjs-four-color-h" data-id="${
            page.id
          }">Edit</li>
          <li class="menu-item view-page gjs-one-bg gjs-two-color gjs-four-color-h" data-id="${
            page.id
          }">View</li>
          <li class="menu-item rename-page gjs-one-bg gjs-two-color gjs-four-color-h" data-id="${
            page.id
          }">Rename</li>
          <li class="menu-item delete-page gjs-one-bg gjs-two-color gjs-four-color-h" data-id="${
            page.id
          }">Delete</li>
        </ul>
      `;
      pageList.appendChild(li);

      // Initially hide the sub-menu
      const subMenu = li.querySelector(".sub-menu");
      subMenu.style.display = "none"; // Initially hide the sub-menu

      // Make the entire li clickable to select the page
      li.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent event bubbling

        // Close other open sub-menus
        document.querySelectorAll(".sub-menu").forEach((menu) => {
          if (menu !== subMenu && menu.style.display === "block") {
            menu.style.animation = "slideUp 0.2s ease-in forwards";
            setTimeout(() => {
              menu.style.display = "none"; // Hide after slide-up animation
              menu.style.animation = ""; // Reset animation
            }, 200); // Match the duration of slide-up animation
          }
        });

        // Toggle current sub-menu
        if (subMenu.style.display === "none") {
          subMenu.style.display = "block"; // Show before animation starts
          subMenu.style.animation = "slideDown 0.2s ease-out forwards";
        } else {
          subMenu.style.animation = "slideUp 0.2s ease-in forwards";
          setTimeout(() => {
            subMenu.style.display = "none"; // Hide after slide-up animation
            subMenu.style.animation = ""; // Reset animation
          }, 200); // Match the duration of slide-up animation
        }
      });

      // Handle "EDIT" click
      const editPageBtn = li.querySelector(".edit-page");
      editPageBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent li click from triggering page selection
        pagesApi.select(page.id); // Open the page for editing
        subMenu.style.display = "none"; // Close sub-menu after action
      });

      // Handle "VIEW" click (currently does nothing)
      const viewPageBtn = li.querySelector(".view-page");
      viewPageBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent li click from triggering page selection
        console.log("View Page clicked for: " + page.getName());
        subMenu.style.display = "none"; // Close sub-menu after action
      });

      // Handle "RENAME" click
      const renamePageBtn = li.querySelector(".rename-page");
      renamePageBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent li click from triggering page selection
        const pageNameElement = li.querySelector(".page-name");

        // Enable content editing
        pageNameElement.contentEditable = "true";
        pageNameElement.focus();

        // Move the cursor to the end of the text
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(pageNameElement);
        range.collapse(false); // Collapse the range to the end
        selection.removeAllRanges();
        selection.addRange(range);

        subMenu.style.display = "none"; // Close sub-menu after action

        // Add event listener to save on blur
        pageNameElement.addEventListener("blur", function () {
          this.contentEditable = "false"; // Disable contenteditable
          const newPageName = this.textContent.trim();
          if (newPageName) {
            page.setName(newPageName); // Update the page name
          }
        });

        // Add event listener to save on Enter key
        pageNameElement.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent new line
            this.blur(); // Trigger blur event to save changes
          }
        });
      });

      // Handle "DELETE" click
      const deletePageBtn = li.querySelector(".delete-page");
      deletePageBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent li click from triggering page selection
        const pageId = e.target.dataset.id;
        const page = pagesApi.getAll().find((p) => p.id === pageId); // Find the page by ID
        const pageName = page ? page.getName() : "Unknown Page"; // Get the page name, fallback if not found

        // Ask for confirmation
        if (
          confirm(`Are you sure you want to delete the page: "${pageName}"?`)
        ) {
          pagesApi.remove(pageId); // Delete the selected page
          renderPages(); // Re-render the list after deletion
        }
        subMenu.style.display = "none"; // Close sub-menu after action
      });
    });
  } else {
    const noPagesMessage = document.createElement("li");
    noPagesMessage.className =
      "page-item gjs-one-bg gjs-two-color gjs-four-color-h";
    noPagesMessage.textContent = "No pages available.";
    pageList.appendChild(noPagesMessage);
  }
}

// Add new page on button click
addPageBtn.addEventListener("click", () => {
  const newPage = pagesApi.add({
    name: `Page ${pagesApi.getAll().length + 1}`,
  });
  pagesApi.select(newPage.id); // Switch to the new page
  renderPages(); // Update the list
});




editor.on("load", function () {
  // Now pages are loaded, call renderPages
  renderPages();
});



// Select the elements
const pagesCollapse = document.querySelector('.pages-collapse');
const pageListContainer = document.getElementById('page-list');
const icon = pagesCollapse.querySelector('i');

// Add click event listener to the pages-collapse div
pagesCollapse.addEventListener('click', function() {
    // Toggle the visibility of the page list
    pageListContainer.classList.toggle('hidden');

    // Toggle the icon between caret-down and caret-up
    if (pageListContainer.classList.contains('hidden')) {
      icon.classList.remove("fa-caret-down");
      icon.classList.add("fa-caret-right");
    } else {
      icon.classList.remove("fa-caret-right");
      icon.classList.add("fa-caret-down");
    }
});



// const previewButton = editor.Panels.getButton('options', 'preview'); // 'views' is the panel ID, 'preview' is the button ID





// Select the elements
const sidenavCollapse = document.querySelector('.sidenav-collapse');
const sideBar = document.getElementById('side-bar-collpase');
const iconBar = sidenavCollapse.querySelector('i');
const gjsResize = document.getElementById("gjs");
const panelButtonResize = document.querySelector(".gjs-pn-devices-c");

// Add click event listener to the pages-collapse div
    iconBar.addEventListener('click', function() {
    // Toggle the visibility of the page list
    sideBar.classList.toggle('hidden');

    // Toggle the icon between caret-down and caret-up
      if (sideBar.classList.contains('hidden')) {
        gjsResize.classList.add("resize");
        gjsResize.style.width = "100%";
        panelButtonResize.classList.add("panel-button-resize");
        sidenavCollapse.classList.add("close");
    } else {
        sidenavCollapse.classList.remove("close");
        gjsResize.classList.remove("resize");
        panelButtonResize.classList.remove("panel-button-resize");
        gjsResize.style.width = "90%";
    }
});










editor.Commands.add("liveContent", {
  run: function () {
    liveContent();
  },
});

// Event listener for live button click
function liveContent() {
  // Get HTML and CSS from GrapesJS editor
  const htmlContent = editor.getHtml();
  const cssContent = editor.getCss();

  // Combine HTML and CSS into one file
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Page</title>
    <link href="styles.css" rel="stylesheet" />
</head>
<body>
${htmlContent}
</body>
</html>`;

  // Create a zip file with JSZip
  const zip = new JSZip();
  zip.file("index.html", fullHtml); // Add the HTML file
  zip.file("styles.css", cssContent); // Add the CSS file

  // Generate the ZIP file as a Blob (Binary Large Object)
  zip
    .generateAsync({ type: "blob" })
    .then(function (blob) {
      // Once the ZIP file is ready, send it to your PHP server
      uploadToPHPServer(blob);
    })
    .catch(function (error) {
      console.error("Error generating the ZIP file:", error);
    });
}

// Function to send the ZIP file to PHP server
function uploadToPHPServer(blob) {
  const formData = new FormData();
  formData.append("file", blob, "site.zip");

  // Send the file to your PHP server (upload.php)
  fetch("live-content.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Upload success:", data);
    })
    .catch((error) => {
      console.error("Upload failed:", error);
    });
}
