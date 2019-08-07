/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
***/
const allStudents = document.querySelectorAll('li');
const pageDiv = document.querySelector('.page');
const allNames = document.querySelectorAll('h3');
const allLinks = document.getElementsByTagName('A');
const header = document.querySelector('.page-header.cf');
const search = document.createElement('div');
const noResults = document.createElement('div');
noResults.innerHTML = "<h3>No search results found..</h3>";
search.className = "student-search";
header.appendChild(search);
const input = document.createElement('input');
input.placeholder = "Search for students..";
search.appendChild(input);
const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchButton.className = "searching"
search.appendChild(searchButton);


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

***/
const showPage = (list, page) =>
{
    for (let i = 0; i < list.length; i += 1)
    {
        let student = list[i];
        let first = (page - 1) * 10; //sets the first student that should show up
        let last = page * 10;        //sets last student that should show up
      
        if (i >= first && i < last)
        {
            student.style.display = "block";
        }
        else
        {
            student.style.display = "none";
        }
    }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (allStudents) =>
{
    const pagesNeeded = Math.ceil(allStudents.length / 10);
    const paginationDiv = document.createElement('div');
    paginationDiv.className = "pagination";
    pageDiv.appendChild(paginationDiv);
    const listOfLinks = document.createElement('ul');
    paginationDiv.appendChild(listOfLinks);

    for (let i = 0; i < pagesNeeded; i += 1)
    {
        let pageNumber = i + 1;
        let listItem = document.createElement('li');
        listOfLinks.appendChild(listItem);
        let aItem = document.createElement('A');
        listItem.appendChild(aItem);
        aItem.textContent = pageNumber;
        aItem.setAttribute("href", "#");
    }
    //possible answer: if (listOfLinks.firstChild !== null)
    listOfLinks.firstChild.className = "active";
    return pagesNeeded;
}

pageDiv.addEventListener('click', (event) => {
    const pageClicked = event.target.textContent;

    if (event.target.tagName == 'A')
    {   
        showPage(allStudents, pageClicked);

        event.target.className = "active";
        
        for (let i = 0; i < allLinks.length; i += 1)
        {
            let oneLink = allLinks[i];
            let text = oneLink.textContent;
            console.log(text);
            if (event.target.textContent !== text)
            {
                allLinks[i].classList.remove("active");
            }
        }
    }

    if (event.target.className == "searching")
    {
        
    }
});

/***
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
***/
input.addEventListener('input', (event) => {
    const name = event.srcElement.value;
    var resultingStudents;
    const removalPagination = document.querySelector('.pagination');

    if (removalPagination !== null) {
        removalPagination.remove();
    }

    //for (let i = 0; i < allStudents.length; i += 1)
    //{
    //    let student = allNames[i].innerText;
    //    if (student.includes(name) || name === "")
    //    {
    //        allStudents[i].style.display = "block";
    //        resultingStudents.push(allStudents[i]);
    //    }
    //    else
    //    {
    //        allStudents[i].style.display = "none";
    //    }
    //}
    resultingStudents = checkNames(name).slice(0);
    if (resultingStudents.length > 0) //If there's search results
    {
        showPage(resultingStudents, 1);
        appendPageLinks(resultingStudents);
    }
});

const checkNames = (string) => {
    var resultingStudents = [];

    for (let i = 0; i < allStudents.length; i += 1) {
        let student = allNames[i].innerText;
        if (student.includes(string) || string === "") {
            allStudents[i].style.display = "block";
            resultingStudents.push(allStudents[i]);
        }
        else {
            allStudents[i].style.display = "none";
        }
    }
}

showPage(allStudents, 1);
appendPageLinks(allStudents);

