/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
Calling global variables used in the program 
***/
document.addEventListener('DOMContentLoaded', () => { // Setting up to make sure script waits for content to load
    const allStudents = document.querySelectorAll('li');
    const pageDiv = document.querySelector('.page');
    const allNames = document.querySelectorAll('h3');
    const allLinks = document.getElementsByTagName('A');
    const header = document.querySelector('.page-header.cf');
    const search = document.createElement('div');
    const noResults = document.createElement('div');
    noResults.innerHTML = "<h2>No search results found..</h2>";
    search.className = "student-search";
    header.appendChild(search);
    const input = document.createElement('input');
    input.placeholder = "Search for students..";
    search.appendChild(input);
    const searchButton = document.createElement('button');
    searchButton.textContent = "Search";
    search.appendChild(searchButton);
    const resetButton = document.createElement('button');
    resetButton.textContent = "Reset";
    search.appendChild(resetButton);


    /*** 
        showPage takes the list of students and the page to show
    ***/
    const showPage = (list, page) => {
        for (let i = 0; i < list.length; i += 1) {
            let student = list[i];
            let first = (page - 1) * 10;                //sets the first student that should show up
            let last = page * 10;                       //sets last student that should show up

            if (i >= first && i < last) {
                student.style.display = "block";
            }
            else {
                student.style.display = "none";
            }
        }
    }

    /*** 
       appendPageLinks takes in the list of students, determines pages needed and sets up links at bottom of page
       DOM elements are saved in the initial part
       ****The extra credit I was unable to complete is to have links show the results of the search appropriately****
    ***/
    const appendPageLinks = (allStudents) => {
        const pagesNeeded = Math.ceil(allStudents.length / 10);
        const paginationDiv = document.createElement('div');
        paginationDiv.className = "pagination";
        pageDiv.appendChild(paginationDiv);
        const listOfLinks = document.createElement('ul');
        paginationDiv.appendChild(listOfLinks);

        for (let i = 0; i < pagesNeeded; i += 1) {
            let pageNumber = i + 1;
            let listItem = document.createElement('li');
            listOfLinks.appendChild(listItem);
            let aItem = document.createElement('A');
            listItem.appendChild(aItem);
            aItem.textContent = pageNumber;
            aItem.setAttribute("href", "#");
        }
        return pagesNeeded;
    }

    /***
        pageDiv eventlistener listens for click events throughout the page div
        It reacts depending on the link, search, or reset button clicked
        Link: Lets you view corresponding page with regard to link clicked
        Search: Helps display 'No search results found' if no matching string
        Reset: *Clears searches and search input and sets list back to default to allow user to search again
               *Also removes the 'No search results found'
    ***/

    pageDiv.addEventListener('click', (event) => {
        const pageClicked = event.target.textContent;
        const name = input.value;

        if (event.target.tagName == 'A')                // LINKS CLICK
        {
            showPage(allStudents, pageClicked);

            event.target.className = "active";          // Sets clicked link to active

            for (let i = 0; i < allLinks.length; i += 1) // Removes active class from non-clicked links
            {
                let oneLink = allLinks[i];
                let text = oneLink.textContent;
                if (event.target.textContent !== text) {
                    allLinks[i].classList.remove("active");
                }
            }
        }

        if (event.target.textContent == "Search")       // SEARCH CLICK
        {
            var searchFound = false;
            for (let i = 0; i < allStudents.length; i += 1) // Loops through students to see if there is matching name, if at least one is found, breaks
            {                                               // If not found, appends 'No search results found' div
                let student = allNames[i].innerText;
                if (student.includes(name) || name === "") {
                    searchFound = true;
                    break;
                }
            }
            if (!(searchFound)) {
                const parent = allStudents.parentNode;
                pageDiv.insertBefore(noResults, parent);
            }
        }

        if (event.target.textContent == "Reset")        // RESET CLICK
        {
            const removalPagination = document.querySelector('.pagination'); // Helps remove current pagination
            input.value = "";                                                // Resets value of input for search
            if (removalPagination !== null) {
                removalPagination.remove();
            }
            if (noResults !== null) {
                noResults.remove();                                          // If no search results were found, removes statement
            }
            showPage(allStudents, 1);                                        // Recalls functions to set page back to default 
            appendPageLinks(allStudents);
        }
    });

    /***
        Page used for input reference:
        https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
        Input eventlistener reacts every time a new letter is typed to or deleted from the search input
        It then creates a new list of students to display based on that search and in real time
    ***/
    input.addEventListener('input', (event) => {
        const prename = event.srcElement.value;             // Saves value typed into the input
        const name = prename.toLowerCase();
        var resultingStudents = [];                         // Prepares variable for the new student list

        const removalPagination = document.querySelector('.pagination');
        if (removalPagination !== null)                     // Removes  current pagination links as search result numbers change
        {
            removalPagination.remove();
        }

        for (let i = 0; i < allStudents.length; i += 1)     // Goes through list of students and, if input matches a letter in student name,
        {                                                   // adds to new list
            let student = allNames[i].innerText;
            if (student.includes(name) || name === "") {
                allStudents[i].style.display = "block";
                resultingStudents.push(allStudents[i]);
            }
            else {
                allStudents[i].style.display = "none";
            }
        }
        if (resultingStudents.length > 0)                   // Makes sure that there are search results before showing the new page
        {
            showPage(resultingStudents, 1);
            appendPageLinks(resultingStudents);
        }
    });

    /***
        Calling functions to set up initial page
    ***/
    showPage(allStudents, 1);
    appendPageLinks(allStudents);
});