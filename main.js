document
    .getElementById('issueInputForm')
    .addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = id => document
        .getElementById(id)
        .value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = {
        id,
        description,
        severity,
        assignedTo,
        status
    };
    let issues = [];
    //this if added for  (for (var i = 0; i < issues.length; i++) { ) this issue
    if (description !== "" && severity !== "" && assignedTo !== "") {
        if (localStorage.getItem('issues')) {
            issues = JSON.parse(localStorage.getItem('issues'));
        }
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));

        document
            .getElementById('issueInputForm')
            .reset();
        fetchIssues();
    } else {
        alert("First write the all property");
    }
    e.preventDefault();
}

const closeIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    // const currentIssue = issues.find(issue => issue.id === id); main (=== this
    // will check matches also the type of the value)
    const currentIssue = issues.find(issue => issue.id == id); // new change (== this will check only the matches)
    currentIssue.status = 'Closed'; // Here is the main status method selected
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    // const remainingIssues = issues.filter( issue.id !== id ) main (!== this will
    // check not  matching also the type of the value)
    const remainingIssues = issues.filter(issue => issue.id != id); // new change (!= this will check only the not matching values)
    console.log(remainingIssues);
    // localStorage.setItem('issues', JSON.stringify(remainingIssues)); this data is
    // intergrade if estetment FOr delete local storage data
    if (confirm("Are you sure to permanently detele this issue?")) {
        localStorage.setItem("issues", JSON.stringify(remainingIssues));
        fetchIssues();
    }
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    const issueCount = document.getElementById('issueCount');

    issuesList.innerHTML = '';

    let openIssue = 0;
    let closeIssue = 0;
    let totalIssue = issues.length;

    for (var i = 0; i < issues.length; i++) {
        const {id, description, severity, assignedTo, status} = issues[i];

        // Why this methods are use inside the for loop because of this
        // issuesList.innerHTML are inner in for loop thats why the algorithm works like
        const red = `background-color:red`;
        const green = `background-color:green`;

        const cross = `text-decoration:line-through`;
        const normal = `text-decoration:none`;


        if (status === "Closed") {
            closeIssue++; // if you don't understand this double click by mouse vs code will mark the code
        } else {
            openIssue++;
        }
        // ///////////////////////////////////////// This ( ? ) contains the if
        // estetment and the ( : ) this contains the else estetment

        issuesList.innerHTML += `<div class="col-md-6 row">
		    	<div class="well">
		      		<h6>Issue ID: ${id} </h6>
					<p><span class="label label-info" style=${
        status === "Closed"
            ? red
            : green}> ${status} </span></p>
					<h3 style=${status === "Closed"
                ? cross
                : normal}> ${description} </h3>
					<p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
					<p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
					<a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
					<a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
				</div>
			</div>`;
    }
    // This is use for issue count
    issueCount.innerHTML = `
    <i class="open">Open: ${openIssue}</i>
    <i class="closed">Close: ${closeIssue}</i>
    <i class="total">Total: ${totalIssue}</i>
`;
}
